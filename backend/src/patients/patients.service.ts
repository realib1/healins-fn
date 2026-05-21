import { Injectable } from '@nestjs/common';
import { PatientRecord } from '../common/healins-types';

const patients: PatientRecord[] = [
  {
    id: 'pat-001',
    fullName: 'Latifa Mohammed',
    dateOfBirth: '1994-08-14',
    primaryFacilityId: 'fac-001',
  },
  {
    id: 'pat-002',
    fullName: 'Kwame Asare',
    dateOfBirth: '1988-03-21',
    primaryFacilityId: 'fac-002',
  },
];

@Injectable()
export class PatientsService {
  listPatients() {
    return {
      count: patients.length,
      items: patients,
    };
  }

  getPatient(id: string) {
    return patients.find((patient) => patient.id === id) ?? null;
  }
}