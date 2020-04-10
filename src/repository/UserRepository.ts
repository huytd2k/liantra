import { injectable } from "inversify";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { UserDTO, UserPgSchema } from "./../model/UserDTO";

export interface UserRepository {
  getAll(): Promise<UserDTO[]>;
  findUserByUsername(username: string): Promise<UserDTO>;
  findUserById(id: string): Promise<UserDTO>;
  create(userDTO: UserDTO): Promise<UserDTO>;
  deleteUser(userDTO: UserDTO): Promise<DeleteResult>;
}



@injectable()
export class UserRepositoryImpPg  implements UserRepository {
  private userRepositoryFromTypeOrm!: Repository<UserDTO>;

	constructor() {
		(async () => {
		this.userRepositoryFromTypeOrm =  getRepository(UserPgSchema);
		})();
	}


  async findUserById (id: string): Promise<UserDTO> {
  	return await this.userRepositoryFromTypeOrm.findOneOrFail(id, { select: ["_id", "username"] });
  }
  public async getAll (): Promise<UserDTO[]> {
  	return await this.userRepositoryFromTypeOrm.find();
  }
  public async create (userDTO: UserDTO): Promise<UserDTO> {
  	const existedUser = await this.userRepositoryFromTypeOrm.findOne({ username: userDTO.username })
  	if (existedUser) {
  		throw Error("invalid username!")
  	}
  	return await this.userRepositoryFromTypeOrm.save(userDTO);
  }

  public async findUserByUsername (queryUsername: string): Promise<UserDTO> {
  	return await this.userRepositoryFromTypeOrm.findOneOrFail({username: queryUsername});
  }
  
  public async deleteUser (userDTO: UserDTO): Promise<DeleteResult> {
  	return await this.userRepositoryFromTypeOrm.delete(userDTO);
  }
}
