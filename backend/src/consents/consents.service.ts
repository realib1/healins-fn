import { Injectable, NotFoundException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConsentsService {
  private readonly SECRET_KEY = 'super-secret-patient-key-for-prototype';

  constructor(private prisma: PrismaService) {}

  generateQrToken(patientId: string): string {
    const payload = {
      sub: patientId,
      purpose: 'clinical_access_grant',
      nonce: Math.random().toString(36).substring(2, 15)
    };
    return jwt.sign(payload, this.SECRET_KEY, { expiresIn: '5m' });
  }

  validateQrToken(token: string): { isValid: boolean; patientId?: string; error?: string } {
    try {
      const decoded = jwt.verify(token, this.SECRET_KEY) as jwt.JwtPayload;
      if (decoded.purpose !== 'clinical_access_grant') {
        return { isValid: false, error: 'Invalid purpose' };
      }
      return { isValid: true, patientId: decoded.sub };
    } catch (error: any) {
      return { isValid: false, error: error.message };
    }
  }

  async grantConsent(patientId: string, type: string) {
    const patient = await this.prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) throw new NotFoundException('Patient not found');

    return this.prisma.consent.create({
      data: {
        patientId,
        type,
        status: 'active',
      },
    });
  }

  async revokeConsent(consentId: string) {
    const consent = await this.prisma.consent.findUnique({ where: { id: consentId } });
    if (!consent) throw new NotFoundException('Consent policy not found');

    return this.prisma.consent.update({
      where: { id: consentId },
      data: {
        status: 'revoked',
        revokedAt: new Date(),
      },
    });
  }

  async listConsents(patientId: string) {
    return this.prisma.consent.findMany({
      where: { patientId },
      orderBy: { grantedAt: 'desc' },
    });
  }
}
