import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GrantPermissionDto } from "./dto/grant-permission.dto";

@Injectable()
export class PermissionsService {
  private readonly logger = new Logger(PermissionsService.name);

  constructor(private prisma: PrismaService) {}

  async grantPermission(dto: GrantPermissionDto) {
    // validate patient exists
    const patient = await this.prisma.patient.findUnique({
      where: { id: dto.patientId },
    });
    if (!patient) throw new NotFoundException("Patient not found");

    const created = await this.prisma.permission.create({
      data: {
        patientId: dto.patientId,
        clinicianId: dto.clinicianId,
        status: "active",
        grantedAt: new Date(),
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      },
    });

    // audit log
    await this.prisma.auditLog
      .create({
        data: {
          patientId: dto.patientId,
          action: "GRANT",
          clinicianId: dto.clinicianId,
          reason: dto.reason ?? null,
          isEmergency: false,
        },
      })
      .catch((e: any) => this.logger.warn("Failed to write audit log", e));

    return created;
  }

  async revokePermission(permissionId: string, reason?: string) {
    const perm = await this.prisma.permission.findUnique({
      where: { id: permissionId },
    });
    if (!perm) throw new NotFoundException("Permission not found");

    const updated = await this.prisma.permission.update({
      where: { id: permissionId },
      data: {
        status: "revoked",
        revokedAt: new Date(),
        revokeReason: reason ?? null,
      },
    });

    await this.prisma.auditLog
      .create({
        data: {
          patientId: perm.patientId,
          action: "REVOKE",
          clinicianId: perm.clinicianId,
          reason: reason ?? null,
          isEmergency: false,
        },
      })
      .catch((e: any) => this.logger.warn("Failed to write audit log", e));

    return updated;
  }

  async listPermissionsForPatient(patientId: string) {
    return this.prisma.permission.findMany({ where: { patientId } });
  }
}
