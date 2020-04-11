import { inject, injectable } from 'inversify';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import TYPES from '../../types';
import { RegisterUserInput } from '../type/input/UserInput';
import { RegisterReponse } from '../type/response/RegisterReponse';
import { ROLE } from './../../model/Role';
import { User } from './../../model/User';
import { UserService } from './../../service/UserService';
import { ApolloContext } from './../type/apollo.context';
@injectable()
@Resolver()
export class UserResolver {
    @inject(TYPES.UserService) private userService!: UserService;
    @Query(() => [User])
    async users(): Promise<User[]> {
        return await this.userService.getAllUser()
    }
    @Mutation(() => RegisterReponse)
    async register(@Arg("userInput") userInput: RegisterUserInput, @Ctx() context: ApolloContext): Promise<RegisterReponse> {
        try {
            const user = new User(userInput.username, userInput.password, ROLE.member, userInput.email);
            await user.hashPassword();
            const resUser: User = await this.userService.createUser(user);
            context.req.session!.userRole = resUser.role;
            context.req.session!.userId = resUser._id;
            return {
                isOk: true,
                userInfo: resUser,
            }


        } catch (err) {
            return {
                isOk: false,
                error: err.message,
            }
        }
    }
    @Query(type => User)
    async me(@Ctx() ctx: ApolloContext): Promise<User> {
        try {
            const user = await this.userService.findUserById(ctx.req.session!.uid);
            return user
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
}