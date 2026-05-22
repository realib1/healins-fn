import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { ConsentsService } from './consents.service';

@Controller('consents')
export class ConsentsController {
  constructor(private readonly consentsService: ConsentsService) {}

  @Post()
  grantConsent(@Body() body: { patientId: string; type: string }) {
    return this.consentsService.grantConsent(body.patientId, body.type);
  }

  @Patch(':id/revoke')
  revokeConsent(@Param('id') id: string) {
    return this.consentsService.revokeConsent(id);
  }

  @Get('patient/:patientId')
  listConsents(@Param('patientId') patientId: string) {
    return this.consentsService.listConsents(patientId);
  }
}
