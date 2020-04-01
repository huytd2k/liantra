import * as bcrypt from 'bcryptjs';

export class User{
    _id!: string;
    username!: string;
    password!: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;

    };
    async hashPassword() {
        const hashedPwd =  await bcrypt.hashSync(this.password);
        this.password = hashedPwd;
    } 
    checkHashedPwdIsValid(uncryptedPwd: string) {
        return bcrypt.compareSync(uncryptedPwd, this.password);

    }
};