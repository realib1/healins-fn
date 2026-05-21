import { Injectable } from '@nestjs/common';
import { AuditRecord } from '../common/healins-types';

const auditEntries: AuditRecord[] = [
  {
    id: 'audit-001',
    actor: 'Dr. Sarah Mensah',
    action: 'Viewed patient record',
    target: 'pat-001',
    timestamp: '2026-05-01T08:30:00Z',
  },
  {
    id: 'audit-002',
    actor: 'Healins system',
    action: 'Generated forecast summary',
    target: 'Northern belt',
    timestamp: '2026-05-01T08:35:00Z',
  },
];

@Injectable()
export class AuditService {
  listAuditEntries() {
    return {
      count: auditEntries.length,
      items: auditEntries,
    };
  }
}