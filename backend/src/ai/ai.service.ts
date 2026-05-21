import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AiService {
  constructor(@InjectQueue('ai-insights') private aiQueue: Queue) {}

  async queueEncounterInsight(encounterId: string, reason: string) {
    await this.aiQueue.add('generate-insight', {
      encounterId,
      reason,
    });
    return { status: 'queued', encounterId };
  }
}
