import { Module } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';

import { ClinicalEventsService } from './clinical-events.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuditController],
  providers: [AuditService, ClinicalEventsService],
  exports: [ClinicalEventsService],
})
export class AuditModule {}