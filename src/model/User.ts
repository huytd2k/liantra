import { ROLE } from './Role';
import * as bcrypt from 'bcryptjs';
import {Length , IsNotEmpty,} from "class-validator";
import { InputType, Field, ObjectType } from 'type-graphql';
import 'reflect-metadata'
@ObjectType()
export class User{ //* Domain class
    _id!: string;

    @Field()
    @Length(6,20)
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @Field()
    email: string | "";
    @IsNotEmpty()
    role!: ROLE;

    constructor(username: string, password: string, role: ROLE | undefined, email: string) {
        this.username = username;
        this.password = password;
        this.role = role || ROLE.unknown;
        this.email = email;

    };
    async hashPassword() {
        const hashedPwd =  await bcrypt.hashSync(this.password);
        this.password = hashedPwd;
    } 
    checkHashedPwdIsValid(uncryptedPwd: string) {
        return bcrypt.compareSync(uncryptedPwd, this.password);

    }
};