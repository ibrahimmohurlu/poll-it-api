import { Module } from "@nestjs/common";
import { VoteService } from "./vote.service";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Vote } from "./entities/vote.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  exports: [VoteService],
  providers: [VoteService],
  controllers: [],
})
export class VoteModule {}
