import { Controller, Get } from '@nestjs/common';
import { EncountersService } from './encounters.service';

@Controller('encounters')
export class EncountersController {
  constructor(private readonly encountersService: EncountersService) {}

  @Get()
  listEncounters() {
    return this.encountersService.listEncounters();
  }
}