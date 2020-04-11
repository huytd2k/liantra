import { UserService } from './UserService';
import { User } from './../model/User';
import { injectable, inject } from 'inversify';
import TYPES from './../types'
import * as jwt from 'jsonwebtoken';

@injectable()
export class AuthService{
    @inject(TYPES.UserService) private userService!: UserService;

    public async login(username: string, password: string) {
        
            const foundUser = await this.userService.findUserbyUsername(username);
            if(foundUser.checkHashedPwdIsValid(password)) {
                return foundUser;
                }
            else {
                throw Error("Invalid Identiy")
            }
         
    }
}