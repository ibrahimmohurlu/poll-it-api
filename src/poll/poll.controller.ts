import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { PollService } from "./poll.service";
import { CreatePollDto } from "./dto/create-poll.dto";

@Controller("polls")
export class PollController {
  constructor(private pollService: PollService) {}

  @Get("/")
  getAllPolls() {
    return this.pollService.getAllPolls();
  }

  @Get("/:id")
  getPollById(@Param("id") pollId) {
    return this.pollService.getPollById(pollId);
  }

  @Post("/")
  createPoll(@Body() createPollDto: CreatePollDto) {
    return this.pollService.createPoll(createPollDto);
  }

  @Delete("/:id")
  deletePollById(@Param("id") pollId) {
    return this.pollService.deletePollById(pollId);
  }
}
