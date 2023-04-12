import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  Request,
} from "@nestjs/common";
import { PollService } from "./poll.service";
import { CreatePollDto } from "./dto/create-poll.dto";
import { UpdatePollDto } from "./dto/update-poll.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("polls")
export class PollController {
  constructor(private pollService: PollService) {}

  @Get("/")
  getAllPolls() {
    return this.pollService.getAllPolls();
  }

  @Get("/:id")
  getPollById(@Param("id", ParseUUIDPipe) pollId) {
    return this.pollService.getPollById(pollId);
  }

  @UseGuards(AuthGuard)
  @Post("/")
  createPoll(@Body() createPollDto: CreatePollDto, @Request() req) {
    return this.pollService.createPoll(createPollDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete("/:id")
  deletePollById(@Param("id", ParseUUIDPipe) pollId) {
    return this.pollService.deletePollById(pollId);
  }

  @UseGuards(AuthGuard)
  @Put("/:id")
  updatePollById(
    @Param("id", ParseUUIDPipe) pollId,
    @Body() updatePollDto: UpdatePollDto,
  ) {
    return this.pollService.updatePollById(pollId, updatePollDto);
  }
}
