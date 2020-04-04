import { User } from './../model/User';
import { inject, injectable } from 'inversify';
import { AuthService } from './../service/AuthService';
import * as Express from 'express';
import { RegistableController } from './RegistableController';
import TYPES from './../types'



@injectable()
export default class AuthController implements RegistableController {
    @inject(TYPES.AuthService) private authService!: AuthService;
    register(app: Express.Application): void {
        app.route('/auth')
            .post(
                async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
                    const postedAcount = new User(req.body.username, req.body.password, undefined);
                    try {
                        const token = await this.authService.login(postedAcount);
                        res.json(token);
                    }
                    catch(err) {
                        res.status(400).send("Error");
                    }
                }
            )
    }

}