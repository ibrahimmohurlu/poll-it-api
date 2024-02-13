import { Module } from "@nestjs/common";
import { PollService } from "./poll.service";
import { PollController } from "./poll.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Poll } from "./entities/poll.entity";
import { PollOption } from "./entities/poll-option.entity";
import { VoteModule } from "src/vote/vote.module";

@Module({
  imports: [VoteModule, TypeOrmModule.forFeature([PollOption, Poll])],
  providers: [PollService],
  controllers: [PollController],
})
export class PollModule {}
