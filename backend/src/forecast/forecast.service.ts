import { Injectable } from '@nestjs/common';

@Injectable()
export class ForecastService {
  getSummary() {
    return {
      region: 'Northern belt',
      status: 'watch',
      riskScore: 0.84,
      signals: [
        'Fever cluster rising in three facilities',
        'Referral volume trending upward',
        'Stockout risk on first-line medication',
      ],
    };
  }
}