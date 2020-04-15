import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { TagToTape } from "./TagToTape";

@ObjectType()
@Entity()
@Unique(["tagName"])
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  tagId!: number;

  @Field()
  @Column()
  tagName!: string;

  @OneToMany(() => TagToTape, (tagToTape) => tagToTape.tag)
  @JoinColumn()
  tapeConnection!: Promise<TagToTape[]>;

  constructor(name: string) {
    super();
    this.tagName = name;
  }
}
