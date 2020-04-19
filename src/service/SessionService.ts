import { session } from 'express-session';
import { injectable } from "inversify";
import { Session } from './../model/Session';
import { User } from './../model/User';


export interface SessionService {
  getAllSession(userId: number): Promise<Session[]>;
  createSession(session: IcreateSession): Promise<Session>;
}
interface IcreateSession {
    userId: number,
    tapeId: number,
    score: number
}
@injectable()
export class SessionServiceImpl implements SessionService {
    async getAllSession(userId: number): Promise<Session[]> {
        try {
            const user =  await User.findOneOrFail({id: userId});
            return await user.sessions;
        } catch(err) {
            throw new Error(err);
        }
    }
    async createSession({userId, tapeId, score}: IcreateSession): Promise<Session> {
        try {
          const session =  await Session.save(new Session(score,tapeId, userId));
          const user = await User.findOneOrFail({id: userId})
          console.log(user);
          User.save(user);
          return session;
       } catch (err) {
           throw new Error(err)
       }
    }
}
