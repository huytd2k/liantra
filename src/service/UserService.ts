import { injectable } from "inversify";
import { DeleteResult } from "typeorm";
import { User } from "./../model/User";

export interface UserService {
  getAllUser(): Promise<User[]>;
  createUser(user: User): Promise<User>;
  findUserbyUsername(username: string): Promise<User>;
  deleteUser(id: number): Promise<DeleteResult>;
  findUserById(id: number): Promise<User>;
}
@injectable()
export class UserServiceIpml implements UserService {
  public async findUserById(id: number): Promise<User> {
    try {
      return await User.findOneOrFail({ userId: id });
    } catch (error) {
      throw new Error("No user found!");
    }
  }

  public async findUserbyUsername(username: string): Promise<User> {
    try {
      return await User.findOneOrFail({ username: username });
    } catch (err) {
      throw new Error("No UserFound!" + err.message);
    }
  }

  public async getAllUser(): Promise<User[]> {
    try {
      return await User.find();
    }
    catch(err) {
      throw new Error(err.message);
    }
  }

  public async createUser(user: User): Promise<User> {
    const tryFindUser = await User.find({username: user.username});
    if(tryFindUser.length === 0 ) {
      return await User.save(user);
    }
    throw new Error("Username has existed!"); 
  }

  public async deleteUser(id: number): Promise<DeleteResult> {
    try {
      const foundUser = await User.findOneOrFail({userId: id});
      return await User.delete(foundUser);
    }
    catch(err) {
      throw new Error(err.message);
    }
  }
}
