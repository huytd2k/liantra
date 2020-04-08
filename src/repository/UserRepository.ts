/* eslint-disable no-mixed-spaces-and-tabs */
import { UserDTO, UserPgSchema } from "./../model/UserDTO";
import { injectable } from "inversify";
import {
	Repository,
	DeleteResult,
} from "typeorm";
import { RepositoryClass } from './Repository.class'

export interface UserRepository {
  getAll(): Promise<UserDTO[]>;
  findUserByUsername(username: string): Promise<UserDTO>;
  findUserById(id: string): Promise<UserDTO>;
  create(userDTO: UserDTO): Promise<UserDTO>;
  deleteUser(userDTO: UserDTO): Promise<DeleteResult>;
}



@injectable()
export class UserRepositoryImpPg extends RepositoryClass implements UserRepository {
  private UserRepositoryFromTypeOrm!: Repository<UserPgSchema>;

  constructor () {
  	super();
  	try {
  		(async () => {
  			const connection = await this.connect();
  			this.UserRepositoryFromTypeOrm = connection.getRepository(UserPgSchema);
  		})();
  	} catch (err) {
  		console.log("Error while connecting to database !");
  	}
  }
  async findUserById (id: string): Promise<UserDTO> {
  	return await this.UserRepositoryFromTypeOrm.findOneOrFail(id, { select: ["_id", "username"] });
  }
  public async getAll (): Promise<UserDTO[]> {
  	return await this.UserRepositoryFromTypeOrm.find();
  }
  public async create (userDTO: UserDTO): Promise<UserDTO> {
  	const existedUser = await this.UserRepositoryFromTypeOrm.findOne({ username: userDTO.username })
  	if (existedUser) {
  		throw Error("invalid username!")
  	}
  	return await this.UserRepositoryFromTypeOrm.save(userDTO);
  }

  public async findUserByUsername (queryUsername: string): Promise<UserDTO> {
  	return await this.UserRepositoryFromTypeOrm.findOneOrFail({username: queryUsername});
  }
  
  public async deleteUser (userDTO: UserDTO): Promise<DeleteResult> {
  	return await this.UserRepositoryFromTypeOrm.delete(userDTO);
  }
}
