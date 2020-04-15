import { Container } from "inversify";
import { AuthResolver } from "./graphql/resolver/AuthResolver";
import { LogAccess } from "./middleware/Test";
import { TapeResolver } from "./graphql/resolver/TapeTagResolver";
import { UserResolver } from "./graphql/resolver/UserResolver";
import { ValidateTapeArgs } from "./middleware/ValidateTapeArgs";
import { AuthService } from "./service/AuthService";
import TYPES from "./types";
import { CheckRole } from "./middleware/CheckRole";
import {
  TapeRepository,
  TapeRepositoryImpPg,
} from "./repository/TapeRepository";
import { TapeService, TapeServiceImpl } from "./service/TapeService";
import {
  UserRepository,
  UserRepositoryImpPg,
} from "./repository/UserRepository";
import { UserService, UserServiceIpml } from "./service/UserService";
import { TagReposiory, TagRepositoryImpl } from "./repository/TagRepository";

const myContainer = new Container();

myContainer.bind(AuthResolver).toSelf().inSingletonScope();
myContainer.bind(LogAccess).toSelf();
myContainer.bind(TapeResolver).toSelf().inSingletonScope()  ;
myContainer.bind(UserResolver).toSelf().inSingletonScope();
myContainer.bind(ValidateTapeArgs).toSelf().inSingletonScope();
myContainer.bind<AuthService>(TYPES.AuthService).to(AuthService);
myContainer.bind<CheckRole>(TYPES.CheckRole).to(CheckRole);
myContainer.bind<TapeRepository>(TYPES.TapeRepository).to(TapeRepositoryImpPg);
myContainer.bind<TapeService>(TYPES.TapeService).to(TapeServiceImpl);
myContainer.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpPg);
myContainer.bind<UserService>(TYPES.UserService).to(UserServiceIpml);
myContainer.bind<TagReposiory>(TYPES.TagRepository).to(TagRepositoryImpl);
export default myContainer;
