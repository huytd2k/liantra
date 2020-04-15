import { inject, injectable } from 'inversify';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import TYPES from '../../types';
import { RegisterUserInput } from '../type/input/UserInput';
import { LoginResponse } from '../type/response/LoginResponse';
import { AuthService } from './../../service/AuthService';
import { ApolloContext } from './../type/apollo.context';
@Resolver()
@injectable()
export class AuthResolver {
    @inject(TYPES.AuthService) private authService!: AuthService;
    @Mutation(() => LoginResponse)
    public async login(@Arg("userInput") userInput: RegisterUserInput, @Ctx() context: ApolloContext): Promise<LoginResponse> {
        const { username, password } = userInput;
        try {
            const foundUser  = await this.authService.login(username, password);
            context.req.session!.userRole =  foundUser.role;
            context.req.session!.userId = foundUser.id;
            return {
                isOk: true,
            }
        } catch (err) {
            return {
                isOk: false,
                error: err.message,
            }
        }

    }
    @Mutation(type => Boolean)
    public async logOut(@Ctx() context : ApolloContext) {
        context.req.session!.destroy(
            (err) => {
                if(err) {
                    return false;
                }
                return true;
            }
        )
        return true;
    }
}