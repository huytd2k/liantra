import { Session } from '../../../model/Session';
import { Field, ObjectType } from 'type-graphql';
import { IResponse } from './IResponse';
import "reflect-metadata"
@ObjectType()
export class CreateSessionResponse implements IResponse {
    @Field()
    isOk!: boolean;
    @Field(type => String, {nullable: true})
    error?: string | undefined;
    @Field({nullable: true})
    session?: Session;
}