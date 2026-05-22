import { Controller, Get, Param } from '@nestjs/common';
import { AuditService } from './audit.service';
import { ClinicalEventsService } from './clinical-events.service';

@Controller('audit')
export class AuditController {
  constructor(
    private readonly auditService: AuditService,
    private readonly clinicalEvents: ClinicalEventsService
  ) {}

  @Get(':patientId')
  async getPatientAuditLog(@Param('patientId') patientId: string) {
    const log = await this.auditService.listAuditEntries(patientId);
    return log.items.map((e: any) => ({
      actor: e.clinicianId || e.doctorName || 'System',
      action: e.action,
      detail: e.reason || `Event recorded: ${e.action}`,
      time: e.timestamp ? new Date(e.timestamp).toISOString() : new Date().toISOString()
    }));
  }

  @Get('events/:patientId')
  async getClinicalEvents(@Param('patientId') patientId: string) {
    const events = await this.clinicalEvents.getEventsForPatient(patientId);
    return events;
  }
}