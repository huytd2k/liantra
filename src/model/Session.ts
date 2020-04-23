import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tape } from "./Tape";
import "reflect-metadata"
import { User } from "./User";


@ObjectType()
@Entity("session")
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  sessionId!: number;

  @Column()
  @Field((type) => Int)
  userId!: number;

  @JoinColumn({name: "userId"})
  @ManyToOne(() => User, user => user.userId)
  user!: User;

  @Column()
  @Field((type) => Int)
  tapeId!: number;

  @Field(() => Tape)
  @ManyToOne(() => Tape, (tape) => tape.tapeId, {primary: true, eager: true})
  @JoinColumn({ name: "tapeId" })
  tape!: Tape;

  @Column()
  @Field((type) => Int)
  sessionScore!: number;

  @CreateDateColumn()
  createdAt!: string;

  constructor(score: number, tapeId: number, userId: number) {
    super();
    this.tapeId = tapeId;
    this.sessionScore = score;
    this.userId = userId;
  }
}
