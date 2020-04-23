import { injectable } from "inversify";
import { InputType, Int, Field } from "type-graphql";
@InputType()
class line {
    @Field()
    'text': string;

    @Field()
    'start': number;
    
    @Field()
    'duration': number;
}
@InputType()
export class TapeInput {
    
    @Field()
    title!: string;

    @Field()
    ytUrl! : string;

    @Field()
    description!: string;

    @Field(() => [line])
    script!: string;
    
    @Field(type => Int)
    level!: number;

    // @Field()
    // tags!: string;
}


