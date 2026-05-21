import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ConsentsService {
  private readonly SECRET_KEY = 'super-secret-patient-key-for-prototype';

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
}
