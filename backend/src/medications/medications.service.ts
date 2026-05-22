import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicationDto, UpdateMedicationDto } from './dto/medication.dto';

@Injectable()
export class MedicationsService {
  constructor(private prisma: PrismaService) {}

  async createMedication(dto: CreateMedicationDto) {
    const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Patient not found');

    return this.prisma.medication.create({
      data: {
        patientId: dto.patientId,
        name: dto.name,
        dose: dto.dose,
        frequency: dto.frequency,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        clinicianId: dto.clinicianId ?? null,
        indication: dto.indication ?? null,
      },
    });
  }

  async updateMedication(id: string, dto: UpdateMedicationDto) {
    const med = await this.prisma.medication.findUnique({ where: { id } });
    if (!med) throw new NotFoundException('Medication not found');

    return this.prisma.medication.update({
      where: { id },
      data: {
        dose: dto.dose,
        frequency: dto.frequency,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  async listMedicationsForPatient(patientId: string) {
    return this.prisma.medication.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
