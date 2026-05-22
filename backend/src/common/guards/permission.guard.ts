import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const clinicianId =
      request.headers["x-clinician-id"] || request.query?.clinicianId;
    const patientId =
      request.params?.patientId ||
      request.body?.patientId ||
      request.query?.patientId;

    if (!clinicianId || !patientId) {
      throw new ForbiddenException("Missing access credentials");
    }

    const permission = await this.prisma.permission.findFirst({
      where: {
        patientId: String(patientId),
        clinicianId: String(clinicianId),
        status: "active",
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
    });

    if (!permission) {
      // Log attempted unauthorized access
      await this.prisma.auditLog
        .create({
          data: {
            patientId: String(patientId),
            action: "UNAUTHORIZED_ACCESS",
            clinicianId: String(clinicianId),
            isEmergency: false,
          },
        })
        .catch(() => {});

      throw new ForbiddenException("No permission to access this patient");
    }

    // Log successful view
    await this.prisma.auditLog
      .create({
        data: {
          patientId: String(patientId),
          action: "VIEW",
          clinicianId: String(clinicianId),
          isEmergency: false,
        },
      })
      .catch(() => {});

    return true;
  }
}
