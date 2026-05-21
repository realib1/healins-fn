import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalEventsService } from './clinical-events.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ClinicalEventsService', () => {
  let service: ClinicalEventsService;
  
  const mockEvents: any[] = [];

  const mockPrismaService = {
    clinicalEvent: {
      create: jest.fn().mockImplementation((dto) => {
        mockEvents.push(dto.data);
        return Promise.resolve(dto.data);
      }),
      findMany: jest.fn().mockImplementation(({ where }) => {
        return Promise.resolve(mockEvents.filter(e => e.patientId === where.patientId));
      })
    }
  };

  beforeEach(async () => {
    mockEvents.length = 0; // reset
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClinicalEventsService,
        { provide: PrismaService, useValue: mockPrismaService }
      ],
    }).compile();

    service = module.get<ClinicalEventsService>(ClinicalEventsService);
  });

  it('should allow appending an event and retrieving it for a patient', async () => {
    const event = {
      eventId: 'evt-1',
      patientId: 'pat-1',
      type: 'EncounterCreated',
      timestamp: new Date().toISOString(),
      actorId: 'doc-1',
      payload: { encounterId: 'enc-1', facilityId: 'fac-1', reason: 'Fever' }
    };

    await service.append(event);
    
    const patientEvents = await service.getEventsForPatient('pat-1');
    expect(patientEvents).toHaveLength(1);
    expect(patientEvents[0].eventId).toBe('evt-1');
  });

  it('should project current state for a patient encounter', async () => {
    await service.append({ eventId: 'evt-1', patientId: 'pat-1', type: 'EncounterCreated', payload: { encounterId: 'enc-1', reason: 'Fever' } });
    await service.append({ eventId: 'evt-2', patientId: 'pat-1', type: 'DiagnosisConfirmed', payload: { encounterId: 'enc-1', condition: 'Malaria' } });
    
    const state = await service.getPatientProjection('pat-1');
    expect(state.encounters['enc-1']).toBeDefined();
    expect(state.encounters['enc-1'].diagnoses).toContain('Malaria');
    expect(state.encounters['enc-1'].reason).toBe('Fever');
  });
});
