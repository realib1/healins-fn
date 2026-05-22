import { IsString, IsNotEmpty, IsOptional, IsISO8601 } from "class-validator";

export class CreateMedicationDto {
  @IsString()
  @IsNotEmpty()
  patientId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  dose!: string;

  @IsString()
  @IsNotEmpty()
  frequency!: string;

  @IsISO8601()
  @IsNotEmpty()
  startDate!: string;

  @IsISO8601()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  clinicianId?: string;

  @IsString()
  @IsOptional()
  indication?: string;
}

export class UpdateMedicationDto {
  @IsString()
  @IsOptional()
  dose?: string;

  @IsString()
  @IsOptional()
  frequency?: string;

  @IsISO8601()
  @IsOptional()
  endDate?: string;
}
