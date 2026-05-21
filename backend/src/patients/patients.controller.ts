import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PatientsService } from "./patients.service";

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  listPatients() {
    return this.patientsService.listPatients();
  }

  @Get(":id")
  getPatient(@Param("id") id: string) {
    const patient = this.patientsService.getPatient(id);

    if (!patient) {
      throw new NotFoundException("Patient not found");
    }

    return patient;
  }
}
