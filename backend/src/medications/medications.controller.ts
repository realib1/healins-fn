import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto, UpdateMedicationDto } from './dto/medication.dto';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  createMedication(@Body() dto: CreateMedicationDto) {
    return this.medicationsService.createMedication(dto);
  }

  @Patch(':id')
  updateMedication(@Param('id') id: string, @Body() dto: UpdateMedicationDto) {
    return this.medicationsService.updateMedication(id, dto);
  }

  @Get('patient/:patientId')
  listMedications(@Param('patientId') patientId: string) {
    return this.medicationsService.listMedicationsForPatient(patientId);
  }
}
