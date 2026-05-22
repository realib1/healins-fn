import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
  Get,
} from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { GrantPermissionDto } from "./dto/grant-permission.dto";
import { RevokePermissionDto } from "./dto/revoke-permission.dto";

@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post("grant")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  grant(@Body() dto: GrantPermissionDto) {
    return this.permissionsService.grantPermission(dto);
  }

  @Post("revoke")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  revoke(@Body() dto: RevokePermissionDto) {
    return this.permissionsService.revokePermission(
      dto.permissionId,
      dto.reason,
    );
  }

  @Get("patient/:patientId")
  listForPatient(@Param("patientId") patientId: string) {
    return this.permissionsService.listPermissionsForPatient(patientId);
  }
}
