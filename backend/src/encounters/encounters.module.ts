import { Module } from "@nestjs/common";
import { EncountersController } from "./encounters.controller";
import { EncountersService } from "./encounters.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AiModule } from "../ai/ai.module";
import { EncounterEventsService } from "./encounter-events.service";
import { EncounterSubscriberService } from "./encounter-subscriber.service";

@Module({
  imports: [PrismaModule, AiModule],
  controllers: [EncountersController],
  providers: [
    EncountersService,
    EncounterEventsService,
    EncounterSubscriberService,
  ],
  exports: [EncountersService, EncounterEventsService],
})
export class EncountersModule {}
