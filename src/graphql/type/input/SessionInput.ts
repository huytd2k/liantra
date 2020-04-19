
import { injectable } from "inversify";
import { InputType, Int, Field } from "type-graphql";

@InputType()
export class SessionInput {
    
    @Field(type => Int)
    tapeId!: number;

    @Field(type => Int)
    score! : number;

    @Field(type => Int)
    userId! : number;
}