import { IsNotEmpty , Contains } from "class-validator";
import { ObjectType, Field } from "type-graphql";


@ObjectType()
export class Tape {
    @Field()
    id?: string;

    @Field()
    @IsNotEmpty()
    title!: string;
    

    @Field()
    @Contains("youtube.com")
    ytUrl!: string;
    
    @Field()
    level!: number;

    @Field()
    description!: string;
    
    @Field()
    script!: string
}

