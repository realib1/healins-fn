import { Injectable } from '@nestjs/common';
import { EncounterRecord } from '../common/healins-types';

const encounters: EncounterRecord[] = [
  {
    id: 'enc-001',
    patientId: 'pat-001',
    facilityId: 'fac-001',
    summary: 'Fever and fatigue, malaria test pending',
    occurredOn: '2026-04-29',
  },
  {
    id: 'enc-002',
    patientId: 'pat-002',
    facilityId: 'fac-002',
    summary: 'Medication review with recurrence monitoring',
    occurredOn: '2026-04-30',
  },
];

@Injectable()
export class EncountersService {
  listEncounters() {
    return {
      count: encounters.length,
      items: encounters,
    };
  }
}