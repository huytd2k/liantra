
import "reflect-metadata";
import { Field, ObjectType } from 'type-graphql';
import { Session } from '../../../model/Session';
import { IResponse } from './IResponse';
@ObjectType()
export class GetUserSessionRes implements IResponse {
    @Field()
    isOk!: boolean;
    @Field(type => String, {nullable: true})
    error?: string | undefined;
    @Field(type => [Session],{nullable: true})
    sessions?: Session[];
}