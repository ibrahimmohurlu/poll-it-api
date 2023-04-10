import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePollDto } from "./dto/create-poll.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UpdatePollDto } from "./dto/update-poll.dto";

@Injectable()
export class PollService {
  constructor(private prismaService: PrismaService) {}
  async getAllPolls() {
    return await this.prismaService.poll.findMany({
      include: { poll_options: true },
    });
  }

  async getPollById(pollId: string) {
    return await this.prismaService.poll.findUnique({
      where: { id: pollId },
      include: {
        poll_options: true,
      },
    });
  }

  async createPoll(pollData: CreatePollDto) {
    return await this.prismaService.poll.create({
      data: {
        question: pollData.question,
        poll_options: {
          create: pollData.options.map((option) => {
            return {
              body: option.body,
            };
          }),
        },
      },
      include: {
        poll_options: true,
      },
    });
  }

  async deletePollById(pollId: string) {
    try {
      const deletedPoll = await this.prismaService.poll.delete({
        where: {
          id: pollId,
        },
        include: {
          poll_options: true,
        },
      });
      return deletedPoll;
    } catch (e: any) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          `Poll with id ${pollId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePollById(pollId: string, updatePollDto: UpdatePollDto) {
    const updatedPoll = await this.prismaService.poll.update({
      where: {
        id: pollId,
      },
      data: {
        question: updatePollDto.question,
        poll_options: {
          updateMany: updatePollDto.options.map((option) => {
            return {
              data: { body: option.body },
              where: { pollId: pollId },
            };
          }),
        },
      },
    });
    return updatedPoll;
  }
}
