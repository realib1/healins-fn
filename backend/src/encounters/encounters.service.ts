import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateEncounterDto } from "./dto/create-encounter.dto";
import { EncounterEventsService } from "./encounter-events.service";

const fallbackEncounters: any[] = [];
const MAX_FALLBACK_SIZE = 100; // Prevent unbounded growth

@Injectable()
export class EncountersService {
  private readonly logger = new Logger(EncountersService.name);

  constructor(
    private prisma: PrismaService,
    private events: EncounterEventsService,
  ) {}

  async listEncounters() {
    try {
      const items = await this.prisma.encounter.findMany({
        orderBy: { visitDate: "desc" },
        take: 100,
      });
      return { count: items.length, items };
    } catch (err) {
      this.logger.warn("Prisma unavailable, returning fallback encounters");
      return { count: fallbackEncounters.length, items: fallbackEncounters };
    }
  }

  async createEncounter(dto: CreateEncounterDto) {
    try {
      const created = await this.prisma.encounter.create({
        data: {
          patientId: dto.patientId,
          facilityId: dto.facilityId ?? null,
          visitDate: new Date(dto.visitDate),
          symptoms: dto.symptoms ?? null,
          diagnosis: dto.diagnosis,
          diagnosisCode: dto.diagnosisCode ?? null,
          treatment: dto.treatment ?? null,
          medicines: dto.medicines ?? [],
          clinicianId: dto.clinicianId ?? null,
          notes: dto.notes ?? null,
        },
      });

      this.events.emitEncounterCreated({
        encounterId: created.id,
        patientId: created.patientId,
        facilityId: created.facilityId,
        visitDate: created.visitDate.toISOString(),
      });

      return created;
    } catch (err) {
      this.logger.warn(
        "Failed to persist encounter to DB, falling back to memory",
        err as Error,
      );
      const fallback = {
        id: `fallback-${Date.now()}`,
        ...dto,
        visitDate: dto.visitDate,
        createdAt: new Date().toISOString(),
      };
      fallbackEncounters.unshift(fallback);
      // Prevent unbounded memory growth
      if (fallbackEncounters.length > MAX_FALLBACK_SIZE) {
        fallbackEncounters.pop();
      }

      this.events.emitEncounterCreated({
        encounterId: fallback.id,
        patientId: fallback.patientId,
        facilityId: fallback.facilityId,
        visitDate: fallback.visitDate,
      });

      return fallback;
    }
  }
}
