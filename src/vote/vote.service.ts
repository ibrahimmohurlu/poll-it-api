import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Vote } from "./entities/vote.entity";
import { Repository } from "typeorm";
import { PollOption } from "src/poll/entities/poll-option.entity";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
  ) {}

  async createVoteByOptionId(optionId: string, userId: string) {
    const vote = new Vote({
      pollOption: new PollOption({ option_id: optionId }),
      user: new User({ user_id: userId }),
    });
    return await this.voteRepository.save(vote);
  }

  async getVotesByOptionIds(optionIds: string[]) {
    const result: Record<string, number> = {};

    for (const optionId of optionIds) {
      result[optionId] = await this.voteRepository.countBy({
        pollOption: { option_id: optionId },
      });
    }

    return result;
  }
}
