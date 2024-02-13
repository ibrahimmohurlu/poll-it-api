import { Injectable } from "@nestjs/common";
import { CreatePollDto } from "./dto/create-poll.dto";

import { UpdatePollDto } from "./dto/update-poll.dto";
import { VotePollDto } from "./dto/vote-poll.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Poll } from "./entities/poll.entity";
import { Repository } from "typeorm";
import { PollOption } from "./entities/poll-option.entity";
import { User } from "src/users/entities/user.entity";
import { VoteService } from "src/vote/vote.service";
import { AuthedUser } from "src/users/authed-user.decorator";

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll)
    private pollRepository: Repository<Poll>,
    private voteService: VoteService,
  ) {}

  async getAllPolls() {
    return await this.pollRepository.find({
      relations: { options: true },
    });
  }

  async getPollById(pollId: string) {
    return await this.pollRepository.findOneOrFail({
      where: { poll_id: pollId },
      relations: { options: true },
    });
  }

  async createPoll(pollData: CreatePollDto, user: AuthedUser) {
    const { options } = pollData;

    const userToConnect = new User({ user_id: user.sub });

    const pollOptions = options.map((option) => new PollOption(option));

    const poll = new Poll({
      title: pollData.title,
      options: pollOptions,
      user: userToConnect,
    });

    const createdPoll = await this.pollRepository.save(poll);

    return createdPoll;
  }

  async deletePollById(pollId: string) {
    return await this.pollRepository
      .createQueryBuilder()
      .delete()
      .from(Poll)
      .where("poll_id=:id", { id: pollId })
      .execute();
  }

  async updatePollById(pollId: string, updatePollDto: UpdatePollDto) {
    const { options, title } = updatePollDto;
    const poll = await this.pollRepository.findOneOrFail({
      where: { poll_id: pollId },
      relations: { options: true },
    });
    if (title) {
      poll.title = title;
    }
    if (options) {
      let lastIndex = 0;
      for (; lastIndex < poll.options.length; lastIndex++) {
        if (options[lastIndex]) {
          poll.options[lastIndex].option_text = options[lastIndex].option_text;
        } else {
          poll.options.pop();
        }
      }
      for (; lastIndex < options.length; lastIndex++) {
        poll.options.push(
          new PollOption({ option_text: options[lastIndex].option_text }),
        );
      }
    }
    return await this.pollRepository.save(poll);
  }

  async votePollById(
    pollId: string,
    user: AuthedUser,
    votePollDto: VotePollDto,
  ) {
    const { option_id } = votePollDto;
    return await this.voteService.createVoteByOptionId(option_id, user.sub);
  }

  async getResultByPollId(pollId: string) {
    const poll = await this.getPollById(pollId);
    const optionIds = poll.options.map((option) => option.option_id);
    const counts = await this.voteService.getVotesByOptionIds(optionIds);
    for (let i = 0; i < poll.options.length; i++) {
      poll.options[i]["count"] = counts[poll.options[i].option_id];
    }
    return poll;
  }
}
