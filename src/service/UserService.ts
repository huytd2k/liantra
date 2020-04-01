import { UserDTO } from "./../model/UserDTO";
import { UserRepository } from "./../repository/UserRepository";
import { User } from "./../model/User";
import { injectable, inject } from "inversify";
import TYPES from "../types";

export interface UserService {
  getAllUser(): Promise<User[]>;
  createUser(user: User): Promise<User>;
  findUserbyUsername(username: string): Promise<User>;
}
@injectable()
export class UserServiceIpml implements UserService {
  @inject(TYPES.UserRepository) private userRepository! : UserRepository;
  public async findUserbyUsername(username: string): Promise<User> {
    const foundUserDTO = await this.userRepository.findUserByUsername(username);
    return this.dtoToUser(foundUserDTO); //* Convert   }
    
  }
  public async getAllUser(): Promise<User[]> {
        const userDtoFromRepo = await this.userRepository.findAll();
        const users = userDtoFromRepo.map((userDTO: UserDTO) =>
          this.dtoToUser(userDTO)
        );
        console.log(userDtoFromRepo);
        return await users;

  }
  public async createUser(user: User): Promise<User> {
        const userDto = this.userToDTO(user);
        const postBackUserDTO = await this.userRepository.create(userDto);
        return this.dtoToUser(postBackUserDTO);
  }
  public dtoToUser(userDTO: UserDTO): User {
    return new User(userDTO.username, userDTO.password);
  }
  public userToDTO(user: User): UserDTO {
    return {
      username: user.username,
      password: user.username
    };
  }
}
