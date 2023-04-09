import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PollService {
  constructor(private prismaService: PrismaService) {}
  async getAllPolls() {
    return await this.prismaService.poll.findMany();
  }
}
