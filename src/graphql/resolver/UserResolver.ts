import { inject, injectable } from 'inversify';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import TYPES from '../../types';
import { RegisterUserInput } from '../type/input/UserInput';
import { RegisterReponse } from '../type/response/RegisterReponse';
import { ROLE } from './../../model/Role';
import { User } from './../../model/User';
import { UserService } from './../../service/UserService';
@injectable()
@Resolver()
export class UserResolver {
    @inject(TYPES.UserService) private userService!: UserService;
    @Query(() => [User])
    async users(): Promise<User[]> {
        return await this.userService.getAllUser()
    }
    @Mutation(() => RegisterReponse)
    async register(@Arg("userInput") userInput: RegisterUserInput): Promise<RegisterReponse> {

        try {
            const user = new User(userInput.username, userInput.password, ROLE.member, userInput.email);
            await user.hashPassword();
            const resUser: User = await this.userService.createUser(user);
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
}