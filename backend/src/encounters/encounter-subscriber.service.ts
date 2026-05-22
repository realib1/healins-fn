import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from "@nestjs/common";
import {
  EncounterEventsService,
  EncounterCreatedPayload,
} from "./encounter-events.service";
import { AiService } from "../ai/ai.service";

@Injectable()
export class EncounterSubscriberService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(EncounterSubscriberService.name);
  private boundHandler: (p: EncounterCreatedPayload) => void;

  constructor(
    private events: EncounterEventsService,
    private ai: AiService,
  ) {
    this.boundHandler = this.handleEncounterCreated.bind(this);
  }

  onModuleInit() {
    this.logger.log("Registering encounter.created listener");
    this.events.onEncounterCreated(this.boundHandler);
  }

  async handleEncounterCreated(payload: EncounterCreatedPayload) {
    this.logger.log(`Received encounter.created for ${payload.encounterId}`);

    try {
      // queue AI insight generation (non-blocking)
      await this.ai.queueEncounterInsight(payload.encounterId, "encounter.created");
      this.logger.log(`Queued AI insight for ${payload.encounterId}`);
    } catch (err) {
      this.logger.warn("Failed to queue AI insight", err as Error);
    }
  }

  onModuleDestroy() {
    this.events.removeListener(this.boundHandler);
  }
}
