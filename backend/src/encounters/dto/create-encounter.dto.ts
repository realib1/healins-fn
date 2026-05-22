import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsISO8601,
  IsArray,
  ArrayNotEmpty,
} from "class-validator";

export class CreateEncounterDto {
  @IsString()
  @IsNotEmpty()
  patientId!: string;

  @IsString()
  @IsOptional()
  facilityId?: string;

  @IsISO8601()
  visitDate!: string;

  @IsString()
  @IsOptional()
  symptoms?: string;

  @IsString()
  @IsNotEmpty()
  diagnosis!: string;

  @IsString()
  @IsOptional()
  diagnosisCode?: string;

  @IsString()
  @IsOptional()
  treatment?: string;

  @IsArray()
  @IsOptional()
  medicines?: string[];

  @IsString()
  @IsOptional()
  clinicianId?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
