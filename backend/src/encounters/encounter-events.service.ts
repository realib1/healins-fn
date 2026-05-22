import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { EventEmitter } from "events";

export type EncounterCreatedPayload = {
  encounterId: string;
  patientId: string;
  facilityId?: string | null;
  visitDate: string;
};

@Injectable()
export class EncounterEventsService implements OnModuleDestroy {
  private readonly emitter = new EventEmitter();
  private readonly logger = new Logger(EncounterEventsService.name);

  emitEncounterCreated(payload: EncounterCreatedPayload) {
    this.logger.log(`Emitting encounter.created for encounter ${payload.encounterId}`);
    this.emitter.emit("encounter.created", payload);
  }

  onEncounterCreated(cb: (p: EncounterCreatedPayload) => void) {
    this.emitter.on("encounter.created", cb);
  }

  removeListener(cb: (p: EncounterCreatedPayload) => void) {
    this.emitter.removeListener("encounter.created", cb);
  }

  onModuleDestroy() {
    this.emitter.removeAllListeners();
  }
}
