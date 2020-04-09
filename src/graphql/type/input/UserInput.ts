import { User } from '../../../model/User';
import { InputType, Field } from "type-graphql";
import { IsEmail } from 'class-validator';
import 'reflect-metadata'
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

