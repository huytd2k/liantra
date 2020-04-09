import { LoginResponse } from '../type/response/LoginResponse';
import { AuthService } from './../../service/AuthService';
import { RegisterUserInput } from '../type/input/UserInput';
import { Query, Mutation, Arg } from 'type-graphql';
import { Resolver } from 'type-graphql';
import { inject, injectable } from 'inversify';
import TYPES from '../../types';
@Resolver()
@injectable()
export class AuthResoler {
    @inject(TYPES.AuthService) private authService!: AuthService;
    @Mutation(() => LoginResponse)
    public async login(@Arg("userInput") userInput: RegisterUserInput): Promise<LoginResponse> {
        const { username, password } = userInput;

        try {
           const token = await this.authService.login(username, password);
           return {
               isOk: true,
               token: token,
           }
        } catch (err) {
            return {
                isOk: false,
                error: err.message, 
            }
        }

    }
}