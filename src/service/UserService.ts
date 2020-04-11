import { UserDTO } from "./../model/UserDTO";
import { UserRepository } from "./../repository/UserRepository";
import { User } from "./../model/User";
import { injectable, inject } from "inversify";
import TYPES from "../types";
import { DeleteResult } from "typeorm";

export interface UserService {
  getAllUser(): Promise<User[]>;
  createUser(user: User): Promise<User>;
  findUserbyUsername(username: string): Promise<User>;
  deleteUser(id: string): Promise<DeleteResult> ;
  findUserById(id: string): Promise<User>;
}
@injectable()
export class UserServiceIpml implements UserService {
  @inject(TYPES.UserRepository) private userRepository! : UserRepository;
  
  public async findUserById(id: string) : Promise<User> {
    const foundDto = await this.userRepository.findUserById(id);
    return this.dtoToUser(foundDto);
  }  


  public async findUserbyUsername(username: string): Promise<User> {
    const foundUserDTO = await this.userRepository.findUserByUsername(username);
    return this.dtoToUser(foundUserDTO); //* Convert   }
    
  }
  
  public async getAllUser(): Promise<User[]> {
        const userDtoFromRepo = await this.userRepository.getAll();
        const users = userDtoFromRepo.map((userDTO: UserDTO) =>
          this.dtoToUser(userDTO)
        );
        return await users;

  }
  
  
  public async createUser(user: User): Promise<User> {
        const userDto = this.userToDTO(user);
        const resUserDTO = await this.userRepository.create(userDto)
        return this.dtoToUser(resUserDTO);
  }
  
  public async deleteUser(id: string): Promise<DeleteResult> {
      const foundUserById = await this.userRepository.findUserById(id);
      try {
        return this.userRepository.deleteUser(foundUserById);
      }
      catch {
        throw Error("Unable to delete!")
      }
  }  

  public dtoToUser(userDTO: UserDTO): User {
    return new User(userDTO.username, userDTO.password, userDTO.role, userDTO.email);
  }
  
  
  public userToDTO(user: User): UserDTO {
    return {
      username: user.username,
      password: user.password,
      role: user.role,
      email: user.email
    };



}
}
