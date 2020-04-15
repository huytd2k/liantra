import { IResponse } from './IResponse';
import { Tag } from '../../../model/Tag';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class CreateTagResponse implements IResponse {
    @Field()
    isOk!: boolean;
    @Field(type => String, {nullable: true})
    error?: string | undefined;
    @Field({nullable: true})
    tagInfo?: Tag;
}