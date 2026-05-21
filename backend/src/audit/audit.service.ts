import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private prisma: PrismaService) {}

  async logAccess(params: {
    patientId: string;
    action: string;
    doctorName?: string;
    isEmergency?: boolean;
    reason?: string;
    ipAddress?: string;
  }) {
    try {
      return await this.prisma.auditLog.create({
        data: {
          patientId: params.patientId,
          action: params.action,
          doctorName: params.doctorName,
          reason: params.reason,
          isEmergency: params.isEmergency ?? false,
          ipAddress: params.ipAddress,
        },
      });
    } catch (err) {
      // If Prisma unavailable, log to console as fallback
      this.logger.warn('Failed to persist audit log to DB, falling back to console', err as Error);
      const fallback = {
        id: `fallback-${Date.now()}`,
        patientId: params.patientId,
        action: params.action,
        doctorName: params.doctorName,
        reason: params.reason,
        isEmergency: params.isEmergency ?? false,
        timestamp: new Date().toISOString(),
        ipAddress: params.ipAddress,
      };
      this.logger.log(JSON.stringify(fallback));
      return fallback;
    }
  }

  async listAuditEntries(patientId: string) {
    try {
      const items = await this.prisma.auditLog.findMany({
        where: { patientId },
        orderBy: { timestamp: 'desc' },
        take: 100,
      });
      return { count: items.length, items };
    } catch (err) {
      this.logger.warn('Failed to read audit logs from DB', err as Error);
      return { count: 0, items: [] };
    }
  }
}