import { Controller, Get, Param } from '@nestjs/common';
import { ClinicalEventsService } from './clinical-events.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly clinicalEvents: ClinicalEventsService) {}

  @Get(':patientId')
  async getPatientAuditLog(@Param('patientId') patientId: string) {
    const events = await this.clinicalEvents.getEventsForPatient(patientId);
    return events.map(e => ({
      actor: e.actorId,
      action: e.type,
      detail: e.payload?.detail || `Event recorded: ${e.type}`,
      time: e.timestamp ? e.timestamp.toISOString() : new Date().toISOString()
    }));
  }
}