import { CheckRole } from "./middleware/CheckRole";
import { TapeServiceImpl, TapeService } from "./service/TapeService";
import { TapeRepository, TapeRepositoryImpPg } from "./repository/TapeRepository";
import { AuthService } from "./service/AuthService";
import { UserRepository, UserRepositoryImpPg } from "./repository/UserRepository";
import { RegistableController } from "./controller/RegistableController";
import { Container } from "inversify";
import TYPES from "./types";
import {UserController} from "./controller/UserController";
import { UserService, UserServiceIpml } from "./service/UserService";
import AuthController from "./controller/AuthController";
import { ValidateJwt } from "./middleware/ValidateJwt";
import TapeController from "./controller/TapeController";

const myContainer = new Container();

myContainer.bind<RegistableController>(TYPES.RegistableController).to(UserController);
myContainer.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpPg);
myContainer.bind<TapeRepository>(TYPES.TapeRepository).to(TapeRepositoryImpPg);
myContainer.bind<UserService>(TYPES.UserService).to(UserServiceIpml);
myContainer.bind<RegistableController>(TYPES.RegistableController).to(AuthController);
myContainer.bind<TapeController>(TYPES.RegistableController).to(TapeController);
myContainer.bind<AuthService>(TYPES.AuthService).to(AuthService);
myContainer.bind<TapeService>(TYPES.TapeService).to(TapeServiceImpl);
myContainer.bind<ValidateJwt>(TYPES.ValidateJwt).to(ValidateJwt);
myContainer.bind<CheckRole>(TYPES.CheckRole).to(CheckRole);

export default myContainer;