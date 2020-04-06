import { CheckRole } from './../middleware/CheckRole';
import { ValidateJwt } from './../middleware/ValidateJwt';
import { User } from './../model/User';
import { RegistableController } from "./RegistableController";
import { UserService } from "./../service/UserService";
import * as Express from "express";
import { injectable, inject } from "inversify";
import TYPES from "../types";
import { validateOrReject } from 'class-validator';
import  {ROLE}  from '../model/Role';

@injectable()
export class UserController implements RegistableController {
  @inject(TYPES.UserService) private userService!: UserService;
  @inject(TYPES.ValidateJwt) private validateJwt!: ValidateJwt;
  @inject(TYPES.CheckRole) private checkRole!: CheckRole;

  register(app: Express.Application): void {
    app
      .route("/user/")
      .get( [this.validateJwt.check, this.checkRole.check([ROLE.admin])],
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
          try {
            if (!(req.body.role.toLowerCase() in ROLE)) throw Error("Invalid Role");
            const user = new User(req.body.username, req.body.password, req.body.role)
            await validateOrReject(user)
            await user.hashPassword();
            const resUser = await this.userService.createUser(user);
            return res.json(resUser);
          } catch (err) {
            res.status(400).send(err);
          }
        }
      )

     app.route("/user/:id")
        .get(
          async(req : Express.Request, res: Express.Response, next: Express.NextFunction) => {
            try {
              const id = req.params.id;
              const foundUser = await this.userService.findUserById(id);
              res.json(foundUser);
            }
            catch(err) {
              res.status(400).send()
            }
          }
        )
      .delete(
        async (
          req: Express.Request,
          res: Express.Response,
          next: Express.NextFunction
        ) => {
          const userID: string = req.params.id;
          try {
            const deleteResult = await this.userService.deleteUser(userID);
            res.json(deleteResult);
          }
          catch (err) {
            res.status(400).send(err);
          }
        }
      )

    return;
  }
}
