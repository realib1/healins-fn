import { AuditService } from "./audit.service";

describe("AuditService", () => {
  let service: AuditService;
  const mockPrisma: any = {
    auditLog: { create: jest.fn(), findMany: jest.fn() },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuditService(mockPrisma as any);
  });

  it("logAccess persists to DB when available", async () => {
    mockPrisma.auditLog.create.mockResolvedValue({
      id: "a1",
      patientId: "pat1",
    });

    const res = await service.logAccess({ patientId: "pat1", action: "VIEW" });

    expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    expect(res).toEqual({ id: "a1", patientId: "pat1" });
  });

  it("logAccess falls back when DB fails", async () => {
    mockPrisma.auditLog.create.mockRejectedValue(new Error("db down"));

    const res = await service.logAccess({
      patientId: "pat-fb",
      action: "VIEW",
    });

    expect(res).toHaveProperty("id");
    expect(String(res.id)).toMatch(/^fallback-/);
  });

  it("listAuditEntries returns items when DB available", async () => {
    mockPrisma.auditLog.findMany.mockResolvedValue([
      { id: "a1" },
      { id: "a2" },
    ]);

    const res = await service.listAuditEntries("pat1");

    expect(mockPrisma.auditLog.findMany).toHaveBeenCalledWith({
      where: { patientId: "pat1" },
      orderBy: { timestamp: "desc" },
      take: 100,
    });
    expect(res.count).toBe(2);
  });

  it("listAuditEntries returns empty when DB fails", async () => {
    mockPrisma.auditLog.findMany.mockRejectedValue(new Error("boom"));

    const res = await service.listAuditEntries("pat1");

    expect(res.count).toBe(0);
    expect(res.items).toEqual([]);
  });
});
