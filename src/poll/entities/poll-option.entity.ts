import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Poll } from "./poll.entity";
import { Vote } from "src/vote/entities/vote.entity";

@Entity()
export class PollOption {
  constructor(pollOption: Partial<PollOption>) {
    Object.assign(this, pollOption);
  }
  @PrimaryGeneratedColumn("uuid")
  option_id: string;

  @Column({ type: "text" })
  option_text: string;

  @ManyToOne(() => Poll, (poll) => poll.options, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "poll_id" })
  poll: Poll;

  @OneToMany(() => Vote, (vote) => vote.pollOption)
  votes: Vote[];
}
