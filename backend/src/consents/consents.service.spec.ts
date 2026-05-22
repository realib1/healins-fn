import { Test, TestingModule } from '@nestjs/testing';
import { ConsentsService } from './consents.service';
import * as jwt from 'jsonwebtoken';

import { PrismaService } from '../prisma/prisma.service';

describe('ConsentsService', () => {
  let service: ConsentsService;
  const mockPrisma: any = {
    patient: { findUnique: jest.fn() },
    consent: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsentsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ConsentsService>(ConsentsService);
  });

  it('should generate a valid QR token and then validate it', () => {
    const token = service.generateQrToken('PAT-123');
    expect(typeof token).toBe('string');

    // Manually verify it has the right payload
    const decoded = jwt.decode(token) as any;
    expect(decoded.sub).toBe('PAT-123');
    expect(decoded.purpose).toBe('clinical_access_grant');

    // Service validation
    const result = service.validateQrToken(token);
    expect(result.isValid).toBe(true);
    expect(result.patientId).toBe('PAT-123');
  });

  it('should reject an invalid token', () => {
    const result = service.validateQrToken('invalid-token-string');
    expect(result.isValid).toBe(false);
  });

  describe('CRUD Operations', () => {
    it('should grant a consent policy for a patient', async () => {
      mockPrisma.patient.findUnique.mockResolvedValue({ id: 'pat-1' });
      mockPrisma.consent.create.mockResolvedValue({ id: 'con-1', type: 'research', status: 'active' });

      const res = await service.grantConsent('pat-1', 'research');
      expect(mockPrisma.consent.create).toHaveBeenCalled();
      expect(res.id).toBe('con-1');
    });

    it('should revoke a consent policy', async () => {
      mockPrisma.consent.findUnique.mockResolvedValue({ id: 'con-1', patientId: 'pat-1' });
      mockPrisma.consent.update.mockResolvedValue({ id: 'con-1', status: 'revoked' });

      const res = await service.revokeConsent('con-1');
      expect(mockPrisma.consent.update).toHaveBeenCalled();
      expect(res.status).toBe('revoked');
    });

    it('should list consents for a patient', async () => {
      mockPrisma.consent.findMany.mockResolvedValue([{ id: 'con-1' }]);
      const res = await service.listConsents('pat-1');
      expect(mockPrisma.consent.findMany).toHaveBeenCalled();
      expect(res.length).toBe(1);
    });
  });
});
