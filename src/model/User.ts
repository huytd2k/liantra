import * as bcrypt from 'bcryptjs';

export class User{
    _id?: string;
    username!: string;
    password!: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;

    };
    hashPassword() {
        this.password = bcrypt.hashSync(this.password);
    } 
    checkHashedPwdIsValid(uncryptedPwd: string) {
        return bcrypt.compareSync(uncryptedPwd, this.password);

    }
};