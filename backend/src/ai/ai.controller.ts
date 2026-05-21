import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('insights')
  async generateInsight(@Body() body: { encounterId: string; reason: string }) {
    return this.aiService.queueEncounterInsight(body.encounterId, body.reason);
  }
}
