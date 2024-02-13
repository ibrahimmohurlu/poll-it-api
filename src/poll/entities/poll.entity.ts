import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PollOption } from "./poll-option.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Poll {
  constructor(poll: Partial<Poll>) {
    Object.assign(this, poll);
  }

  @PrimaryGeneratedColumn("uuid")
  poll_id: string;

  @Column({ type: "varchar", length: 200 })
  title: string;

  @ManyToOne(() => User, (user) => user.polls)
  @JoinColumn()
  user: User;

  @OneToMany(() => PollOption, (polOption) => polOption.poll, {
    //onDelete: "CASCADE",
    //onUpdate: "CASCADE",
    cascade: true,
  })
  options: PollOption[];
}
