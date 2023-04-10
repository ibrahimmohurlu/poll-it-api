import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsArray,
  IsString,
  ArrayNotEmpty,
  ValidateNested,
  ArrayMinSize,
} from "class-validator";

export class UpdatePollDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @Type(() => Option)
  options: Option[];
}

export class Option {
  @IsString({})
  @IsNotEmpty()
  body: string;
}
