import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsArray,
  IsString,
  ArrayNotEmpty,
  ValidateNested,
  ArrayMinSize,
} from "class-validator";
import CreatePollOptionDto from "./create-poll-option.dto";

export class CreatePollDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @Type(() => CreatePollOptionDto)
  options: CreatePollOptionDto[];
}
