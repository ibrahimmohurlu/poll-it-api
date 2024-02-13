import { PollOption } from "src/poll/entities/poll-option.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vote {
  constructor(vote: Partial<Vote>) {
    Object.assign(this, vote);
  }
  @PrimaryGeneratedColumn("uuid")
  vote_id: string;

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => PollOption, (pollOption) => pollOption.votes)
  @JoinColumn({ name: "option_id" })
  pollOption: PollOption;
}
