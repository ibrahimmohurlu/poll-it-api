import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async findUserByEmail(email: string) {
    return { id: "1", email: "test@example.com", hash: "hash", salt: "salt" };
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, hash, salt } = createUserDto;
    return {};
  }
}
