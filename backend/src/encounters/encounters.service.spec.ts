import { Test, TestingModule } from "@nestjs/testing";
import { EncountersService } from "./encounters.service";
import { PrismaService } from "../prisma/prisma.service";
import { EncounterEventsService } from "./encounter-events.service";

describe("EncountersService", () => {
  let service: EncountersService;
  let eventsService: EncounterEventsService;

  const mockPrisma = {
    encounter: {
      create: jest.fn().mockImplementation((args) => Promise.resolve({ id: "enc-123", ...args.data })),
      findMany: jest.fn().mockResolvedValue([]),
    },
  };

  const mockEvents = {
    emitEncounterCreated: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncountersService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: EncounterEventsService, useValue: mockEvents },
      ],
    }).compile();

    service = module.get<EncountersService>(EncountersService);
    eventsService = module.get<EncounterEventsService>(EncounterEventsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should emit encounter.created event when an encounter is created", async () => {
    const dto = {
      patientId: "pat-1",
      facilityId: "fac-1",
      visitDate: new Date().toISOString(),
      diagnosis: "Flu",
    };

    const result = await service.createEncounter(dto);
    
    expect(result.id).toBe("enc-123");
    expect(eventsService.emitEncounterCreated).toHaveBeenCalledWith({
      encounterId: "enc-123",
      patientId: "pat-1",
      facilityId: "fac-1",
      visitDate: dto.visitDate,
    });
  });
});
