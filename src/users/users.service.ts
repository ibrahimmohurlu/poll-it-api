import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

export type User = {
  id: string;
  email: string;
  password: string;
};
@Injectable()
export class UsersService {
  private readonly users: Array<User> = [
    {
      id: "a",
      email: "acc0@mail.com",
      password: "test",
    },
    {
      id: "b",
      email: "acc1@mail.com",
      password: "test",
    },
  ];

  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email);
  }
}
