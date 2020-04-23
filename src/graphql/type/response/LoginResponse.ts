import { ObjectType, Field } from "type-graphql";
import { IResponse } from "./IResponse";
import 'reflect-metadata'
import { User } from "../../../model/User";
@ObjectType()
export class LoginResponse implements IResponse{
    @Field(type => Boolean)
    isOk!: boolean;
    
    @Field(type => String, {nullable: true})
    token?: string | null;
    
    @Field(type => String, {nullable: true})
    error?: string;  


    @Field(type => User, {nullable: true})
    userInfo? : User;
}