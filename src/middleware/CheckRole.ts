import { UserService } from './../service/UserService';
import  {ROLE}  from './../model/Role';
import { inject, injectable } from 'inversify';
import TYPES from '../types';
import {Request, Response, NextFunction} from "express"
import { json } from 'body-parser';


@injectable()
export class CheckRole {
    @inject(TYPES.UserService) private userService! : UserService; 

    public check(roles: Array<ROLE>) : any {
        return async (req: Request, res: Response, next: NextFunction) => {
            const username :string = res.locals.jwtPayload.username;
            try {
            const foundUserFromRepo = await this.userService.findUserbyUsername(username); //* Get an user domain object with locals username
            if ( roles.indexOf( foundUserFromRepo.role) > -1) { //* check if user role in required roles
                    next();
                }
            else {
                res.status(401).send(); //* User's role not in required reole
            }
            }
            catch(err) {
                res.status(401).send(json(err));
            }
            

        }

    }
}