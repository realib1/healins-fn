import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClinicalEventsService {
  constructor(private prisma: PrismaService) {}

  async append(event: any) {
    await this.prisma.clinicalEvent.create({
      data: {
        eventId: event.eventId,
        patientId: event.patientId,
        type: event.type,
        actorId: event.actorId,
        payload: event.payload,
        timestamp: event.timestamp ? new Date(event.timestamp) : undefined,
      }
    });
  }

  async getEventsForPatient(patientId: string): Promise<any[]> {
    return this.prisma.clinicalEvent.findMany({
      where: { patientId },
      orderBy: { timestamp: 'asc' }
    });
  }

  async getPatientProjection(patientId: string): Promise<any> {
    const events = await this.getEventsForPatient(patientId);
    const state = { patientId, encounters: {} as Record<string, any>, activeAccess: [] };

    for (const event of events) {
      if (event.type === 'EncounterCreated') {
        state.encounters[event.payload.encounterId] = {
          reason: event.payload.reason,
          facilityId: event.payload.facilityId,
          diagnoses: [],
          medications: [],
          isAmended: false
        };
      } else if (event.type === 'DiagnosisConfirmed') {
        if (state.encounters[event.payload.encounterId]) {
          state.encounters[event.payload.encounterId].diagnoses.push(event.payload.condition);
        }
      }
    }

    return state;
  }
}
