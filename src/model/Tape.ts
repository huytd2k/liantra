import { Contains, IsNotEmpty } from "class-validator";
import { Ctx, Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApolloContext } from './../graphql/type/apollo.context';
import { Tag } from './Tag';
import { TagToTape } from "./TagToTape";
import {ScriptLine} from './ScriptLine'

@ObjectType()
@Entity()
export class Tape extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  tapeId!: number;

  @Field()
  @IsNotEmpty()
  @Column()
  title!: string;

  @Field()
  @Contains("youtube.com")
  @Column()
  ytUrl!: string;

  @Field()
  @Column()
  level!: number;

  @Field()
  @Column()
  description!: string;

  tagString!: string;

  @Field(() => [ ScriptLine ])
  @Column({type: "simple-json"})
  script!: ScriptLine[];

  @JoinColumn()
  @OneToMany(() => TagToTape, (tagToTape) => tagToTape.tape)
  tagConnection!: Promise<TagToTape[]>;

  @Field(() => [Tag])
  async tags(@Ctx() {tagsLoader}: ApolloContext): Promise<Tag[]> {
      return await tagsLoader.load(this.tapeId)
  }

  constructor(
    tlt: string,
    url: string,
    lv: number,
    des: string,
    script: string
  ) {
    super();
    this.title = tlt;
    this.ytUrl = url;
    this.level = lv;
    this.description = des;
    this.script = script;
  }
}
