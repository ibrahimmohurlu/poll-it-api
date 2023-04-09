import { Module } from "@nestjs/common";
import { PollService } from "./poll.service";
import { PollController } from "./poll.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [PollService],
  controllers: [PollController],
  imports: [PrismaModule],
})
export class PollModule {}
