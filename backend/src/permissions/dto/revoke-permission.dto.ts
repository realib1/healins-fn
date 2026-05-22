import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class RevokePermissionDto {
  @IsString()
  @IsNotEmpty()
  permissionId!: string;

  @IsString()
  @IsOptional()
  reason?: string;
}
