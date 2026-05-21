import { Injectable } from '@nestjs/common';
import { FacilityRecord } from '../common/healins-types';

const facilities: FacilityRecord[] = [
  {
    id: 'fac-001',
    name: 'Tamale Central',
    district: 'Northern belt',
    status: 'active',
  },
  {
    id: 'fac-002',
    name: 'Kalpohin Clinic',
    district: 'Northern belt',
    status: 'active',
  },
  {
    id: 'fac-003',
    name: 'Sagnarigu Health Post',
    district: 'Northern belt',
    status: 'watch',
  },
];

@Injectable()
export class FacilitiesService {
  listFacilities() {
    return {
      count: facilities.length,
      items: facilities,
    };
  }
}