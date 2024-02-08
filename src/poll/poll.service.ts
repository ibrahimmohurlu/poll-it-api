import { Injectable } from "@nestjs/common";
import { CreatePollDto } from "./dto/create-poll.dto";

import { UpdatePollDto } from "./dto/update-poll.dto";
import { VotePollDto } from "./dto/vote-poll.dto";

@Injectable()
export class PollService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async getAllPolls() {
    return [];
  }

  async getPollById(pollId: string) {
    return [];
  }

  async createPoll(pollData: CreatePollDto, user) {
    return [];
  }

  async deletePollById(pollId: string) {
    return {};
  }

  async updatePollById(pollId: string, updatePollDto: UpdatePollDto) {
    return {};
  }

  async votePollById(pollId: string, votePollDto: VotePollDto) {
    const { option_id } = votePollDto;
    return {};
  }

  async getResultByPollId(pollId: string) {
    return {};
  }
}
