import { UserDTO, UserPgSchema } from "./../model/UserDTO";
import { User } from "./../model/User";
import { injectable } from "inversify";
import {
  createConnection,
  Connection,
  Repository,
  ConnectionOptions
} from "typeorm";

export interface UserRepository {
  findAll(): Promise<UserDTO[]>;
  create(userDTO: UserDTO): Promise<UserDTO>;
  findUserByUsername(username: string): Promise<UserDTO>;
}
@injectable()
export class UserRepositoryImpPg implements UserRepository {
  private UserRepositoryFromTypeOrm!: Repository<UserPgSchema>;

  constructor() {
    try {
      (async () => {
        const connection = await this.connect();
        this.UserRepositoryFromTypeOrm = connection.getRepository(UserPgSchema);
      })();
    } catch (err) {
      console.log("Error while connecting to database !");
    }
  }
  public async findAll(): Promise<UserDTO[]> {
    return await this.UserRepositoryFromTypeOrm.find();
  }
  public async create(userDTO: UserDTO): Promise<UserDTO> {
    return await this.UserRepositoryFromTypeOrm.save(userDTO);
  }
  public async findUserByUsername(queryUsername: string): Promise<UserDTO> {
    return await this.UserRepositoryFromTypeOrm.findOneOrFail({username: queryUsername});
  }
  public connect(): Promise<Connection> {
    return createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "mike",
      password: "huy221100",
      database: "postgres",
      entities: [UserPgSchema],
      synchronize: true
    });
  }
}
