import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, hash, salt } = createUserDto;
    return await this.prismaService.user.create({
      data: {
        email,
        hash,
        salt,
      },
      select: {
        id: true,
        email: true,
        created_at: true,
      },
    });
  }
}
