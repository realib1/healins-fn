import { Test, TestingModule } from '@nestjs/testing';
import { MedicationsService } from './medications.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('MedicationsService', () => {
  let service: MedicationsService;
  const mockPrisma: any = {
    patient: { findUnique: jest.fn() },
    medication: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicationsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<MedicationsService>(MedicationsService);
  });

  describe('createMedication', () => {
    it('should create a medication when patient exists', async () => {
      mockPrisma.patient.findUnique.mockResolvedValue({ id: 'pat-1' });
      mockPrisma.medication.create.mockResolvedValue({ id: 'med-1', name: 'Aspirin' });

      const res = await service.createMedication({
        patientId: 'pat-1',
        name: 'Aspirin',
        dose: '100mg',
        frequency: 'Daily',
        startDate: new Date().toISOString(),
      });

      expect(mockPrisma.medication.create).toHaveBeenCalled();
      expect(res.id).toBe('med-1');
    });

    it('should throw NotFoundException if patient does not exist', async () => {
      mockPrisma.patient.findUnique.mockResolvedValue(null);

      await expect(service.createMedication({
        patientId: 'missing',
        name: 'Aspirin',
        dose: '100mg',
        frequency: 'Daily',
        startDate: new Date().toISOString(),
      })).rejects.toThrow(NotFoundException);
    });
  });

  describe('listMedicationsForPatient', () => {
    it('should list medications', async () => {
      mockPrisma.medication.findMany.mockResolvedValue([{ id: 'med-1' }]);
      const res = await service.listMedicationsForPatient('pat-1');
      expect(mockPrisma.medication.findMany).toHaveBeenCalled();
      expect(res.length).toBe(1);
    });
  });

  describe('updateMedication', () => {
    it('should update a medication', async () => {
      mockPrisma.medication.findUnique.mockResolvedValue({ id: 'med-1' });
      mockPrisma.medication.update.mockResolvedValue({ id: 'med-1', dose: '200mg' });

      const res = await service.updateMedication('med-1', { dose: '200mg' });
      expect(mockPrisma.medication.update).toHaveBeenCalled();
      expect(res.dose).toBe('200mg');
    });

    it('should throw if medication not found', async () => {
      mockPrisma.medication.findUnique.mockResolvedValue(null);
      await expect(service.updateMedication('missing', { dose: '200mg' })).rejects.toThrow(NotFoundException);
    });
  });
});
