import { injectable } from "inversify";
import { InputType, Int, Field } from "type-graphql";

@InputType()
export class TapeInput {
    
    @Field()
    title!: string;

    @Field()
    ytUrl! : string;

    @Field()
    description!: string;

    @Field()
    script!: string;
    
    @Field(type => Int)
    level!: number;

    @Field()
    tags!: string;
}