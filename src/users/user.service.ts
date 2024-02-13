import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .getOneOrFail();
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    const result = await this.userRepository.save([user]);
    const filteredUser = { user_id: result[0].user_id, email: result[0].email };
    return filteredUser;
  }
}
