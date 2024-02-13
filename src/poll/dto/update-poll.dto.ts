import { Type } from "class-transformer";
import {
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  ArrayMinSize,
  ValidateIf,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { UpdatePollOptionDto } from "./update-poll-option.dto";

export class UpdatePollDto {
  @ValidateIf((o) => o.title !== undefined)
  @IsNotEmpty()
  @IsString()
  title?: string | undefined;

  @ValidateIf((o) => o.options !== undefined)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @Type(() => UpdatePollOptionDto)
  options?: UpdatePollOptionDto[] | undefined;
}
