import { Controller, Get, Post, Body, UsePipes } from "@nestjs/common";
import { EncountersService } from "./encounters.service";
import { CreateEncounterDto } from "./dto/create-encounter.dto";
import { ValidationPipe } from "@nestjs/common";

@Controller("encounters")
export class EncountersController {
  constructor(private readonly encountersService: EncountersService) {}

  @Get()
  listEncounters() {
    return this.encountersService.listEncounters();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createEncounter(@Body() dto: CreateEncounterDto) {
    return this.encountersService.createEncounter(dto);
  }
}
