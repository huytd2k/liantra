import { injectable } from "inversify";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { User } from '../model/User';
export interface UserRepository {
  getAll(): Promise<User[]>;
  findUserByUsername(username: string): Promise<User>;
  findUserById(id: string): Promise<User>;
  create(userDTO: User): Promise<User>;
  deleteUser(userDTO: User): Promise<DeleteResult>;
}



@injectable()
export class UserRepositoryImpPg  implements UserRepository {
  private userRepositoryFromTypeOrm!: Repository<User>;

	constructor() {
		(async () => {
		this.userRepositoryFromTypeOrm =  getRepository(User);
		})();
	}


  async findUserById (id: string): Promise<User> {
  	return await this.userRepositoryFromTypeOrm.findOneOrFail(id, { select: ["_id", "username"] });
  }
  public async getAll (): Promise<User[]> {
  	return await this.userRepositoryFromTypeOrm.find();
  }
  public async create (user: User): Promise<User> {
    const existedUser = await this.userRepositoryFromTypeOrm.findOne({ username: user.username })
  	if (existedUser) {
  		throw Error("invalid username!")
    }
  	return await this.userRepositoryFromTypeOrm.save(user);
  }

  public async findUserByUsername (queryUsername: string): Promise<User> {
   const resUser  = await this.userRepositoryFromTypeOrm.findOneOrFail({username: queryUsername});
    return resUser;
  }
  
  public async deleteUser (userDTO: User): Promise<DeleteResult> {
  	return await this.userRepositoryFromTypeOrm.delete(userDTO);
  }
}
