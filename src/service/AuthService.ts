import { UserService } from './UserService';
import { User } from './../model/User';
import { injectable, inject } from 'inversify';
import TYPES from './../types'
import * as jwt from 'jsonwebtoken';

@injectable()
export class AuthService{
    @inject(TYPES.UserService) private userService!: UserService;

    public async login(postedUser : User) {
        
            const foundUser = await this.userService.findUserbyUsername(postedUser.username);
            console.log(foundUser);
            if(foundUser.checkHashedPwdIsValid(postedUser.password)) {
                    return jwt.sign({
                        "userId": postedUser._id,
                        "username": postedUser.username,
                        "password": postedUser.password
                    }, "Secret", {expiresIn: "1h"});
                }
            else {
                throw Error("Invalid Identiy")
            }
         
    }
}