import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { AiGateway } from './ai.gateway';

@Processor('ai-insights')
export class AiProcessor extends WorkerHost {
  private readonly logger = new Logger(AiProcessor.name);

  constructor(private readonly aiGateway: AiGateway) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}...`);
    
    // Make actual HTTP request to FastAPI ai-service
    const aiBaseUrl = process.env.AI_BASE_URL || 'http://localhost:8001';
    
    try {
      const response = await fetch(`${aiBaseUrl}/v1/summaries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: job.data.patientId || 'unknown',
          encounter_id: job.data.encounterId,
          clinical_notes: job.data.reason,
          medications: [],
          lab_results: []
        })
      });
      
      const result = await response.json();
      
      this.logger.log(`Job ${job.id} completed. Broadcasting result...`);
      
      // Relay result to connected clinician
      this.aiGateway.broadcastInsight(job.data.encounterId, result);
      
      return result;
    } catch (error) {
      this.logger.error(`Job ${job.id} failed to reach AI service:`, error);
      throw error;
    }
  }
}
