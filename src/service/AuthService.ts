import { inject, injectable } from "inversify";
import TYPES from "./../types";
import { UserService } from "./UserService";

@injectable()
export class AuthService {
  @inject(TYPES.UserService) private userService!: UserService;

  public async login(username: string, password: string) {
    try {
      const foundUser = await this.userService.findUserbyUsername(username);
      if (foundUser.checkHashedPwdIsValid(password)) {
        return foundUser;
      } else {
        throw Error("Invalid Identiy");
      }
    } catch (error) {
      throw new Error("Username or password is wrong!");
    }
  }
}
