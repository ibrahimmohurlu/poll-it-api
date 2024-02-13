import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";
import * as bcrypt from "bcrypt";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersService.findUserByEmail(email);
    const hash = await bcrypt.hash(password, user.salt);

    if (hash !== user.hash) {
      throw new UnauthorizedException("Email or password is incorrect");
    }
    const payload = { email: user.email, sub: user.user_id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const payload: CreateUserDto = {
      email,
      hash,
      salt,
    };

    return await this.usersService.createUser(payload);
  }
}
