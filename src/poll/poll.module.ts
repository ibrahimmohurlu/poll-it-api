import { Module } from "@nestjs/common";
import { PollService } from "./poll.service";
import { PollController } from "./poll.controller";

@Module({
  providers: [PollService],
  controllers: [PollController],
})
export class PollModule {}
