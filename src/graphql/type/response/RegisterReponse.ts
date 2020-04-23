import { IResponse } from "./IResponse";
import { User } from "../../../model/User";
import { Field, ObjectType, Int } from "type-graphql";
import 'reflect-metadata'
@ObjectType()
export class RegisterReponse implements IResponse {
    @Field()
    isOk!: boolean;
    
    @Field(type => String, {nullable: true})
    error?: string | undefined;

    @Field(type => User, {nullable: true})
    userInfo?: User; 

    @Field(type=> Int, {nullable: true})
    errCode?: number;
}