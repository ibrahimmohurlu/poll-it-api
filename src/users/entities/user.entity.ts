import { Poll } from "src/poll/entities/poll.entity";
import { Vote } from "src/vote/entities/vote.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column({ unique: true, nullable: false, type: "varchar", length: 200 })
  email: string;

  @Column({ type: "varchar", nullable: false, length: "200" })
  salt: string;

  @Column({ type: "text", nullable: false })
  hash: string;

  @OneToMany(() => Poll, (poll) => poll.user, { cascade: true })
  polls: Poll[];

  @OneToMany(() => Vote, (vote) => vote.user, { cascade: true })
  votes: Vote[];
}
