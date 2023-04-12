import { IsUUID } from "class-validator";

export class VotePollDto {
  @IsUUID()
  option_id: string;
}
