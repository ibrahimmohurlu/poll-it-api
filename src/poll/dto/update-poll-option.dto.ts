import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePollOptionDto {
  @IsString({})
  @IsNotEmpty()
  option_text: string;
}
