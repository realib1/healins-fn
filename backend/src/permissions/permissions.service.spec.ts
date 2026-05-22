import { NotFoundException } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";

describe("PermissionsService", () => {
  let service: PermissionsService;
  const mockPrisma: any = {
    patient: { findUnique: jest.fn() },
    permission: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
    auditLog: { create: jest.fn() },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PermissionsService(mockPrisma as any);
  });

  it("grants permission when patient exists", async () => {
    mockPrisma.patient.findUnique.mockResolvedValue({ id: "pat-1" });
    mockPrisma.permission.create.mockResolvedValue({
      id: "perm-1",
      patientId: "pat-1",
    });
    mockPrisma.auditLog.create.mockResolvedValue({ id: "audit-1" });

    const result = await service.grantPermission({
      patientId: "pat-1",
      clinicianId: "Dr A",
    } as any);

    expect(mockPrisma.patient.findUnique).toHaveBeenCalledWith({
      where: { id: "pat-1" },
    });
    expect(mockPrisma.permission.create).toHaveBeenCalled();
    expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    expect(result).toEqual({ id: "perm-1", patientId: "pat-1" });
  });

  it("throws when patient missing on grant", async () => {
    mockPrisma.patient.findUnique.mockResolvedValue(null);

    await expect(
      service.grantPermission({
        patientId: "missing",
        clinicianId: "Dr",
      } as any),
    ).rejects.toThrow(NotFoundException);
  });

  it("revokes permission when exists", async () => {
    mockPrisma.permission.findUnique.mockResolvedValue({
      id: "perm-2",
      patientId: "pat-2",
      clinicianId: "Dr B",
    });
    mockPrisma.permission.update.mockResolvedValue({
      id: "perm-2",
      status: "revoked",
    });
    mockPrisma.auditLog.create.mockResolvedValue({ id: "audit-2" });

    const result = await service.revokePermission("perm-2", "no longer needed");

    expect(mockPrisma.permission.findUnique).toHaveBeenCalledWith({
      where: { id: "perm-2" },
    });
    expect(mockPrisma.permission.update).toHaveBeenCalled();
    expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    expect(result).toEqual({ id: "perm-2", status: "revoked" });
  });

  it("throws when revoking missing permission", async () => {
    mockPrisma.permission.findUnique.mockResolvedValue(null);

    await expect(service.revokePermission("missing")).rejects.toThrow(
      NotFoundException,
    );
  });
});
