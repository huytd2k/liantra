import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ScriptLine {
  @Field()
  text!: string;

  @Field()
  start!: number;

  @Field()
  duration!: number;
}