import { UserService } from './UserService';
import { User } from './../model/User';
import { injectable, inject } from 'inversify';
import TYPES from './../types'
import * as jwt from 'jsonwebtoken';

@injectable()
export class AuthService{
    @inject(TYPES.UserService) private userService!: UserService;

    public async login(postedUser : User) {
        try {
            const foundUser = await this.userService.findUserbyUsername(postedUser.username);
            
            if(foundUser.checkHashedPwdIsValid(postedUser.password)) {
                    return jwt.sign({
                        "userId": postedUser._id,
                        "username": postedUser.username,
                        "password": postedUser.password
                    }, "Secret", {expiresIn: "1h"});
                }
        } catch(err) {
            throw Error("Invalid identity!");
        }
    }
}