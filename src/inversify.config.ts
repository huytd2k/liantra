import { Container } from "inversify";
import { AuthResoler } from './graphql/resolver/AuthResolver';
import { Resolver, TapeResolver } from './graphql/resolver/TapeResolver';
import { UserResolver } from './graphql/resolver/UserResolver';
import { CheckRole } from "./middleware/CheckRole";
import { ValidateJwt } from "./middleware/ValidateJwt";
import { TapeRepository, TapeRepositoryImpPg } from "./repository/TapeRepository";
import { UserRepository, UserRepositoryImpPg } from "./repository/UserRepository";
import { AuthService } from "./service/AuthService";
import { TapeService, TapeServiceImpl } from "./service/TapeService";
import { UserService, UserServiceIpml } from "./service/UserService";
import TYPES from "./types";
import { PgConnection } from './util/PgConnection';

const myContainer = new Container();

myContainer.bind(AuthResoler).toSelf().inSingletonScope();
myContainer.bind(TapeResolver).toSelf().inSingletonScope();
myContainer.bind(UserResolver).toSelf().inSingletonScope();
myContainer.bind<AuthService>(TYPES.AuthService).to(AuthService);
myContainer.bind<CheckRole>(TYPES.CheckRole).to(CheckRole);
myContainer.bind<PgConnection>(TYPES.Connection).to(PgConnection);
myContainer.bind<TapeRepository>(TYPES.TapeRepository).to(TapeRepositoryImpPg);
myContainer.bind<TapeService>(TYPES.TapeService).to(TapeServiceImpl);
myContainer.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpPg);
myContainer.bind<UserService>(TYPES.UserService).to(UserServiceIpml);
myContainer.bind<ValidateJwt>(TYPES.ValidateJwt).to(ValidateJwt);

export default myContainer;
