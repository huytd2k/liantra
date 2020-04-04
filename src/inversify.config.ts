import { TapeRepository, TapeRepositoryImpPg } from './repository/TapeRepository';
import { AuthService } from './service/AuthService';
import { UserRepository, UserRepositoryImpPg } from './repository/UserRepository';
import { RegistableController } from './controller/RegistableController';
import { Container } from 'inversify';
import TYPES from './types';
import {UserController} from './controller/UserController';
import { UserService, UserServiceIpml } from './service/UserService';
import AuthController from './controller/AuthController';
import { ValidateJwt } from './middleware/ValidateJwt';

const myContainer = new Container();

myContainer.bind<RegistableController>(TYPES.RegistableController).to(UserController);
myContainer.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpPg);

myContainer.bind<TapeRepository>(TYPES.TapeRepository).to(TapeRepositoryImpPg);
myContainer.bind<UserService>(TYPES.UserService).to(UserServiceIpml);
myContainer.bind<RegistableController>(TYPES.RegistableController).to(AuthController);
myContainer.bind<AuthService>(TYPES.AuthService).to(AuthService);
myContainer.bind<ValidateJwt>(TYPES.ValidateJwt).to(ValidateJwt);


export default myContainer;