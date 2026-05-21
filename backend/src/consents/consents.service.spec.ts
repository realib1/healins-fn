import { Test, TestingModule } from '@nestjs/testing';
import { ConsentsService } from './consents.service';
import * as jwt from 'jsonwebtoken';

describe('ConsentsService', () => {
  let service: ConsentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsentsService],
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
});
