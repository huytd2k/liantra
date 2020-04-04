import { ROLE } from './Role';
import * as bcrypt from 'bcryptjs';
import {Length, IsEmail, IsNotEmpty,} from "class-validator";



export class User{ //* Domain class
    _id!: string;

    @Length(6,20)
    @IsNotEmpty()
    username: string;

    @Length(6, 20)
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role!: ROLE;

    constructor(username: string, password: string, role: ROLE | undefined) {
        this.username = username;
        this.password = password;
        this.role = role || ROLE.unknown;

    };
    async hashPassword() {
        const hashedPwd =  await bcrypt.hashSync(this.password);
        this.password = hashedPwd;
    } 
    checkHashedPwdIsValid(uncryptedPwd: string) {
        return bcrypt.compareSync(uncryptedPwd, this.password);

    }
};