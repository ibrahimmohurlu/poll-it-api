import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  BadRequestException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: "Get access_token by email and password.",
  })
  @ApiBody({
    type: [SignInDto],
    examples: {
      a: {
        summary: "Test account",
        value: {
          email: "test@mail.com",
          password: "test",
        } as SignInDto,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("/login")
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: "Register the service by email and password." })
  @ApiBody({
    type: [SignUpDto],
    examples: {
      a: {
        summary: "Register as John Doe",
        value: {
          email: "john@doe.com",
          password: "john.doe",
        } as SignInDto,
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("/register")
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);
    return { message: `user with id:${user.user_id} created.` };
  }

  @ApiOperation({
    summary: "Get the user profile. Auth required.",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("/profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
