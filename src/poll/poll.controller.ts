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
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Res,
  BadRequestException,
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
import { Response } from "express";
import { AuthedUser } from "src/users/authed-user.decorator";

@ApiTags("polls")
@Controller({ path: "polls", version: "1" })
export class PollController {
  constructor(private pollService: PollService) {}

  @Get("/")
  @ApiOperation({ summary: "Returns all the polls." })
  async getAllPolls(
    @Query("take", new DefaultValuePipe(30), ParseIntPipe) take,
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip,
    @Res() res: Response,
  ) {
    const polls = await this.pollService.getAllPolls();
    return res.status(200).json({ data: polls, take, skip });
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
  async createPoll(
    @Body() createPollDto: CreatePollDto,
    @AuthedUser() user: AuthedUser,
  ) {
    return await this.pollService.createPoll(createPollDto, user);
  }

  @ApiOperation({ summary: "Delete the poll by id. Auth required." })
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    example: "a161381c-2058-45f5-ae34-b9648e018400",
  })
  @UseGuards(AuthGuard)
  @Delete("/:id")
  async deletePollById(
    @Param("id", ParseUUIDPipe) pollId,
    @Res() res: Response,
  ) {
    const result = await this.pollService.deletePollById(pollId);
    if (result.affected < 1) {
      throw new BadRequestException({
        path: `/polls/${pollId}`,
        timestamp: new Date().toISOString(),
        message: `poll with id:${pollId} not found.`,
      });
    }
    return res.status(204).end();
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
  async updatePollById(
    @Param("id", ParseUUIDPipe) pollId: string,
    @Body() updatePollDto: UpdatePollDto,
  ) {
    return await this.pollService.updatePollById(pollId, updatePollDto);
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
    @AuthedUser() user: AuthedUser,
  ) {
    return this.pollService.votePollById(pollId, user, votePollDto);
  }

  @ApiOperation({ summary: "Get the result of the poll by id." })
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    description: "Get the result of the poll 'Is dogs awesome?'. ",
    example: "a161381c-2058-45f5-ae34-b9648e018400",
  })
  @Get("/:id/result")
  async getResultByPollId(@Param("id", ParseUUIDPipe) pollId: string) {
    return await this.pollService.getResultByPollId(pollId);
  }
}
