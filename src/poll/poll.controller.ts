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
import { VotePollDto } from "./dto/vote-poll.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("polls")
@Controller("polls")
export class PollController {
  constructor(private pollService: PollService) {}

  @Get("/")
  @ApiOperation({ summary: "Returns all the polls." })
  getAllPolls() {
    return this.pollService.getAllPolls();
  }

  @ApiOperation({ summary: "Get the poll by id." })
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    example: "a161381c-2058-45f5-ae34-b9648e018400",
  })
  @Get("/:id")
  getPollById(@Param("id", ParseUUIDPipe) pollId) {
    return this.pollService.getPollById(pollId);
  }

  @ApiOperation({ summary: "Create a new poll. Auth required." })
  @ApiBody({ type: CreatePollDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post("/")
  createPoll(@Body() createPollDto: CreatePollDto, @Request() req) {
    return this.pollService.createPoll(createPollDto, req.user);
  }

  @ApiOperation({ summary: "Delete the poll by id. Auth required." })
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    example: "a161381c-2058-45f5-ae34-b9648e018400",
  })
  @UseGuards(AuthGuard)
  @Delete("/:id")
  deletePollById(@Param("id", ParseUUIDPipe) pollId) {
    return this.pollService.deletePollById(pollId);
  }

  @ApiOperation({ summary: "Update the poll by id. Auth required." })
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    example: "a161381c-2058-45f5-ae34-b9648e018400",
  })
  @ApiBody({ type: [UpdatePollDto] })
  @UseGuards(AuthGuard)
  @Put("/:id")
  updatePollById(
    @Param("id", ParseUUIDPipe) pollId: string,
    @Body() updatePollDto: UpdatePollDto,
  ) {
    return this.pollService.updatePollById(pollId, updatePollDto);
  }

  @ApiOperation({
    summary: "Vote the one options of the poll by id. Auth required.",
  })
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    description:
      "Poll id to vote. option_id must be in the request body. Example option_id = 7930c6d7-5da0-498b-9cb3-7509d0c4331f",
    example: "a161381c-2058-45f5-ae34-b9648e018400",
  })
  @ApiBody({
    type: [VotePollDto],
    description: "Is dogs awesome?",
    examples: {
      a: {
        summary: "Vote for yes!",
        value: {
          option_id: "7930c6d7-5da0-498b-9cb3-7509d0c4331f",
        } as VotePollDto,
      },
      b: {
        summary: "Vote for 'I dont know' :/ ",
        value: {
          option_id: "fd7e254b-92f3-4565-94bb-fe6cbbf5e6a7",
        } as VotePollDto,
      },
    },
  })
  @UseGuards(AuthGuard)
  @Post("/:id/vote")
  votePollById(
    @Param("id", ParseUUIDPipe) pollId: string,
    @Body() votePollDto: VotePollDto,
  ) {
    return this.pollService.votePollById(pollId, votePollDto);
  }

  @ApiOperation({ summary: "Get the result of the poll by id." })
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    description: "Get the result of the poll 'Is dogs awesome?'. ",
    example: "a161381c-2058-45f5-ae34-b9648e018400",
  })
  @Get("/:id/result")
  getResultByPollId(@Param("id", ParseUUIDPipe) pollId: string) {
    return this.pollService.getResultByPollId(pollId);
  }
}
