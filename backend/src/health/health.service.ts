import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getRoot() {
    return { name: 'Healins Backend', status: 'ok' };
  }

  getHealth() {
    return { service: 'healins-backend', status: 'ok' };
  }
}