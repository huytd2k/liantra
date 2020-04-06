import * as Express from 'express';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'inversify';

@injectable()
export class ValidateJwt {
    public async check(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
        if (!req.headers["auth"]) {
            res.status(400).send()
            return;
        }
        const token = req.headers["auth"] as any;
        let jwtPayload;
        try {
            jwtPayload = jwt.verify(token, "Secret"); // * Verify the token
            res.locals.jwtPayload = jwtPayload; //* Load token on res lifecycle variable locals
            const { username, password } = jwtPayload as any; 
            const newToken = jwt.sign({ username, password }, "Secret", { expiresIn: "1h" });
            res.setHeader("token", newToken)
            next();
        }
        catch (err) {
            res.status(401).send();
        }

    }

} 