import { Module } from "@nestjs/common";
import { AiService } from "./ai.service";
import { AiController } from "./ai.controller";
import { BullModule } from "@nestjs/bullmq";
import { AiProcessor } from "./ai.processor";
import { AiGateway } from "./ai.gateway";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "ai-insights",
    }),
  ],
  providers: [AiService, AiProcessor, AiGateway],
  controllers: [AiController],
  exports: [AiService],
})
export class AiModule {}
