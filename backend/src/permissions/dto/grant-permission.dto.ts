import { IsString, IsNotEmpty, IsOptional, IsISO8601 } from "class-validator";

export class GrantPermissionDto {
  @IsString()
  @IsNotEmpty()
  patientId!: string;

  @IsString()
  @IsNotEmpty()
  clinicianId!: string;

  @IsISO8601()
  @IsOptional()
  expiresAt?: string;

  @IsString()
  @IsOptional()
  reason?: string;
}
