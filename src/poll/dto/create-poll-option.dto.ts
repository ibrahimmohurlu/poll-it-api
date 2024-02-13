import { IsNotEmpty, IsString } from "class-validator";

export default class CreatePollOptionDto {
  @IsString({})
  @IsNotEmpty()
  option_text: string;
}
