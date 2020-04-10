import { Auth } from './../../middleware/Auth';
import { session } from 'express-session';
import { ApolloContext } from './../type/apollo.context';
import { inject, injectable } from 'inversify';
import { Arg, Mutation, Query, Resolver, Ctx, UseMiddleware } from 'type-graphql';
import TYPES from '../../types';
import { RegisterUserInput } from '../type/input/UserInput';
import { RegisterReponse } from '../type/response/RegisterReponse';
import { ROLE } from './../../model/Role';
import { User } from './../../model/User';
import { UserService } from './../../service/UserService';
import { type } from 'os';
import jwt from 'jsonwebtoken'
@injectable()
@Resolver()
export class UserResolver {
    @inject(TYPES.UserService) private userService!: UserService;
    @Query(() => [User])
    async users(): Promise<User[]> {
        return await this.userService.getAllUser()
    }
    @Mutation(() => RegisterReponse)
    async register(@Arg("userInput") userInput: RegisterUserInput, @Ctx() ctx : ApolloContext): Promise<RegisterReponse> {

        try {
            const user = new User(userInput.username, userInput.password, ROLE.member, userInput.email);
            await user.hashPassword();
            const resUser: User = await this.userService.createUser(user);
            const token = await jwt.sign({uid : user._id},"secret",{expiresIn: "1h"});
            ctx.req.session!.token = token;
            ctx.req.session!.uid = user._id;
            return {
                isOk: true,
                userInfo: resUser
            }
            

        } catch(err) {
            return {
                isOk: false,
                error: err.message,
            }
        }
    }
    @UseMiddleware(Auth)
    @Query( type => User ) 
    async me(@Ctx() ctx : ApolloContext) : Promise<User>{
        try {
            const user = await this.userService.findUserById(ctx.req.session!.uid);
            return user
        } 
        catch(err) {
            throw new Error(err.message);
        }
    }
}