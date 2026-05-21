export type PatientRecord = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  primaryFacilityId: string;
};

export type EncounterRecord = {
  id: string;
  patientId: string;
  facilityId: string;
  summary: string;
  occurredOn: string;
};

export type FacilityRecord = {
  id: string;
  name: string;
  district: string;
  status: 'active' | 'watch' | 'offline';
};

export type PermissionRecord = {
  id: string;
  patientId: string;
  granteeName: string;
  role: string;
  status: 'active' | 'revoked' | 'expired';
};

export type AuditRecord = {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
};