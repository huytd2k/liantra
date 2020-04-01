import { User } from './../model/User';
import { RegistableController } from "./RegistableController";
import { UserService } from "./../service/UserService";
import * as Express from "express";
import { injectable, inject } from "inversify";
import TYPES from "../types";

@injectable()
export class UserController implements RegistableController {
  @inject(TYPES.UserService) private userService!: UserService;

  register(app: Express.Application): void {
    app
      .route("/user/")
      .get(
        async (
          req: Express.Request,
          res: Express.Response,
          next: Express.NextFunction
        ) => {
            const users = await this.userService.getAllUser();
            return res.json(users);
          
          }
      )
      .post(
        async (
          req: Express.Request,
          res: Express.Response,
          next: Express.NextFunction
        ) => {
            const user = new User(req.body.username, req.body.password)
          try {
            const resUser = await this.userService.createUser(user);
            return res.json(resUser);
          } catch (err) {
            next(err);
          }
        }
      );

    return;
  }
}
