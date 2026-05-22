import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuditModule } from "./audit/audit.module";
import { EncountersModule } from "./encounters/encounters.module";
import { FacilitiesModule } from "./facilities/facilities.module";
import { ForecastModule } from "./forecast/forecast.module";
import { HealthModule } from "./health/health.module";
import { PatientsModule } from "./patients/patients.module";
import { ConsentsModule } from "./consents/consents.module";
import { CliniciansModule } from "./clinicians/clinicians.module";
import { MedicationsModule } from "./medications/medications.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AiModule } from "./ai/ai.module";
import { BullModule } from "@nestjs/bullmq";

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6380", 10),
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    PatientsModule,
    EncountersModule,
    FacilitiesModule,
    ForecastModule,
    AuditModule,
    ConsentsModule,
    CliniciansModule,
    MedicationsModule,
    PermissionsModule,
    PrismaModule,
    AiModule,
  ],
})
export class AppModule {}
