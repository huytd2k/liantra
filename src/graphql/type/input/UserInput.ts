import { User } from '../../../model/User';
import { InputType, Field, ArgsType, Int } from "type-graphql";
import { IsEmail } from 'class-validator';
import 'reflect-metadata'
import { type } from 'os';
interface UserInput {
    username: string;
    password: string
}


@InputType()
export class RegisterUserInput implements UserInput{

    @Field()
    username!: string;

    @Field()
    password!: string;
   
    @IsEmail()
    @Field(type => String, {nullable: true})
    email!: string;
}

@InputType()
export class LoginUserInput implements UserInput {

    @Field()
    username!: string;

    @Field()
    password!: string;

}

@ArgsType()
export class UserIdInput {
    @Field(type => Int)
    userId!: number;

}
