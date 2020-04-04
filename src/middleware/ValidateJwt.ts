import * as Express from 'express';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'inversify';

@injectable()
export class ValidateJwt {
    public async check(req:Express.Request, res: Express.Response, next: Express.NextFunction) {
        if (!req.headers["auth"]) {
            res.status(400).send()
            return;
       }
        const token  = req.headers["auth"] as any;
       let jwtPayload;
       try {
           jwtPayload   = jwt.verify(token, "Secret" );
           res.locals.jwtPayload = jwtPayload;
           next();
       }
       catch(err) {
           res.status(400).send();
       }
       const { username , password } = jwtPayload as any;
       const newToken = jwt.sign({username, password}, "Secret",{expiresIn: "1h"});
       res.setHeader("token", newToken);
    }

} 