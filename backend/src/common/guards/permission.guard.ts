import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const doctorName = request.headers['x-doctor-name'] || request.query?.doctorName;
    const patientId = request.params?.patientId || request.body?.patientId || request.query?.patientId;

    if (!doctorName || !patientId) {
      throw new ForbiddenException('Missing access credentials');
    }

    const permission = await this.prisma.permission.findFirst({
      where: {
        patientId: String(patientId),
        doctorName: String(doctorName),
        status: 'active',
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      }
    });

    if (!permission) {
      // Log attempted unauthorized access
      await this.prisma.auditLog.create({
        data: {
          patientId: String(patientId),
          action: 'UNAUTHORIZED_ACCESS',
          doctorName: String(doctorName),
          isEmergency: false,
        }
      }).catch(() => {});

      throw new ForbiddenException('No permission to access this patient');
    }

    // Log successful view
    await this.prisma.auditLog.create({
      data: {
        patientId: String(patientId),
        action: 'VIEW',
        doctorName: String(doctorName),
        isEmergency: false,
      }
    }).catch(() => {});

    return true;
  }
}
