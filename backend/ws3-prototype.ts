/**
 * PROTOTYPE - WIPE ME
 * 
 * Question this answers: "Does this event-sourcing state model feel right for the clinical data path?"
 * 
 * How to run:
 * cd backend && npx ts-node ws3-prototype.ts
 */

// --- 1. Event Definitions ---

type EventType = 
  | 'EncounterCreated' 
  | 'DiagnosisConfirmed' 
  | 'MedicationPrescribed' 
  | 'AccessGranted' 
  | 'RecordAmended';

interface BaseEvent {
  eventId: string;
  patientId: string;
  type: EventType;
  timestamp: string;
  actorId: string; // The clinician, patient, or system that triggered it
}

interface EncounterCreatedEvent extends BaseEvent {
  type: 'EncounterCreated';
  payload: { encounterId: string; facilityId: string; reason: string };
}

interface DiagnosisConfirmedEvent extends BaseEvent {
  type: 'DiagnosisConfirmed';
  payload: { encounterId: string; condition: string; severity: string };
}

interface MedicationPrescribedEvent extends BaseEvent {
  type: 'MedicationPrescribed';
  payload: { encounterId: string; drug: string; dosage: string };
}

interface AccessGrantedEvent extends BaseEvent {
  type: 'AccessGranted';
  payload: { clinicianId: string; scope: string; expiresAt: string };
}

interface RecordAmendedEvent extends BaseEvent {
  type: 'RecordAmended';
  payload: { targetEventId: string; newReason: string; previousReason: string };
}

type ClinicalEvent = 
  | EncounterCreatedEvent 
  | DiagnosisConfirmedEvent 
  | MedicationPrescribedEvent 
  | AccessGrantedEvent
  | RecordAmendedEvent;

// --- 2. In-Memory Event Store ---

class EventStore {
  private events: ClinicalEvent[] = [];

  append(event: ClinicalEvent) {
    this.events.push(event);
    console.log(`[EVENT APPENDED] ${event.type} at ${event.timestamp}`);
  }

  getEventsForPatient(patientId: string): ClinicalEvent[] {
    return this.events.filter(e => e.patientId === patientId);
  }
}

// --- 3. Projection: Building the Current State from Events ---

interface PatientProjection {
  patientId: string;
  encounters: Record<string, {
    reason: string;
    facilityId: string;
    diagnoses: string[];
    medications: string[];
    isAmended: boolean;
  }>;
  activeAccess: string[]; // clinician IDs
}

function projectPatientState(patientId: string, events: ClinicalEvent[]): PatientProjection {
  const state: PatientProjection = {
    patientId,
    encounters: {},
    activeAccess: []
  };

  const now = new Date().toISOString();

  // Replay events in order to reconstruct the state
  for (const event of events) {
    switch (event.type) {
      case 'EncounterCreated':
        state.encounters[event.payload.encounterId] = {
          reason: event.payload.reason,
          facilityId: event.payload.facilityId,
          diagnoses: [],
          medications: [],
          isAmended: false
        };
        break;

      case 'DiagnosisConfirmed':
        if (state.encounters[event.payload.encounterId]) {
          state.encounters[event.payload.encounterId].diagnoses.push(event.payload.condition);
        }
        break;

      case 'MedicationPrescribed':
        if (state.encounters[event.payload.encounterId]) {
          state.encounters[event.payload.encounterId].medications.push(`${event.payload.drug} (${event.payload.dosage})`);
        }
        break;

      case 'RecordAmended':
        // A simple amendment example: finding the original encounter creation and updating the reason
        const targetEvent = events.find(e => e.eventId === event.payload.targetEventId);
        if (targetEvent && targetEvent.type === 'EncounterCreated') {
          const encId = targetEvent.payload.encounterId;
          if (state.encounters[encId]) {
            state.encounters[encId].reason = event.payload.newReason;
            state.encounters[encId].isAmended = true;
          }
        }
        break;

      case 'AccessGranted':
        if (event.payload.expiresAt > now && !state.activeAccess.includes(event.payload.clinicianId)) {
          state.activeAccess.push(event.payload.clinicianId);
        }
        break;
    }
  }

  return state;
}

// --- 4. Simulation Execution ---

function runSimulation() {
  const store = new EventStore();
  const PATIENT_A = 'PAT-1001';
  const CLINICIAN_X = 'DR-902';
  const ENC_1 = 'ENC-505';

  console.log("=== STARTING EVENT SOURCING PROTOTYPE ===\n");

  // 1. Patient grants access via QR code
  store.append({
    eventId: 'EV-1',
    patientId: PATIENT_A,
    type: 'AccessGranted',
    timestamp: new Date().toISOString(),
    actorId: PATIENT_A,
    payload: { clinicianId: CLINICIAN_X, scope: 'full-read', expiresAt: '2026-12-31T23:59:59Z' }
  });

  // 2. Clinician creates an encounter
  store.append({
    eventId: 'EV-2',
    patientId: PATIENT_A,
    type: 'EncounterCreated',
    timestamp: new Date().toISOString(),
    actorId: CLINICIAN_X,
    payload: { encounterId: ENC_1, facilityId: 'FAC-01', reason: 'Fever and chills' }
  });

  // 3. Clinician confirms a diagnosis
  store.append({
    eventId: 'EV-3',
    patientId: PATIENT_A,
    type: 'DiagnosisConfirmed',
    timestamp: new Date().toISOString(),
    actorId: CLINICIAN_X,
    payload: { encounterId: ENC_1, condition: 'Malaria', severity: 'moderate' }
  });

  // 4. Clinician prescribes medication
  store.append({
    eventId: 'EV-4',
    patientId: PATIENT_A,
    type: 'MedicationPrescribed',
    timestamp: new Date().toISOString(),
    actorId: CLINICIAN_X,
    payload: { encounterId: ENC_1, drug: 'Artemether-Lumefantrine', dosage: '80/480mg' }
  });

  // Let's project the state after the initial visit
  console.log("\n--- STATE AFTER VISIT ---");
  let patientEvents = store.getEventsForPatient(PATIENT_A);
  console.log(JSON.stringify(projectPatientState(PATIENT_A, patientEvents), null, 2));

  // 5. Next day: Clinician realizes the reason was recorded wrong and amends it
  console.log("\n--- CLINICIAN AMENDS RECORD ---");
  store.append({
    eventId: 'EV-5',
    patientId: PATIENT_A,
    type: 'RecordAmended',
    timestamp: new Date().toISOString(),
    actorId: CLINICIAN_X,
    payload: { targetEventId: 'EV-2', previousReason: 'Fever and chills', newReason: 'High fever, severe chills, joint pain' }
  });

  // Let's project the state after the amendment
  console.log("\n--- FINAL STATE AFTER AMENDMENT ---");
  patientEvents = store.getEventsForPatient(PATIENT_A);
  console.log(JSON.stringify(projectPatientState(PATIENT_A, patientEvents), null, 2));
  
  console.log("\n=== PROTOTYPE COMPLETE ===");
}

runSimulation();
