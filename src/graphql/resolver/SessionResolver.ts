import { UserIdInput } from './../type/input/UserInput';
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { Arg, Mutation, Query, Resolver, Args } from "type-graphql";
import { SessionService } from "../../service/SessionService";
import TYPES from "../../types";
import { SessionInput } from "../type/input/SessionInput";
import { CreateSessionResponse } from './../type/response/CreateSessionResponse';
import { GetUserSessionRes } from './../type/response/GetUserSessionRes';


@Resolver()
@injectable()
export class SessionResolver implements Resolver {
  @inject(TYPES.SessionService) private sessionService!: SessionService;
    @Query(() => GetUserSessionRes) 
    async getAllSession(@Args() {userId} : UserIdInput) : Promise<GetUserSessionRes> {
        try {
           const sessions = await this.sessionService.getAllSession(userId); 
           return {
               isOk: true,
               sessions: sessions,
           }
        } catch (error) {
         return {
             isOk: false,
             error: error
         }   
        }
    }
  


  @Mutation(() => CreateSessionResponse)
   async createSession(@Arg("sessionInput") sessionInput: SessionInput) : Promise<CreateSessionResponse> {
       try {
       const resSession = await this.sessionService.createSession(sessionInput);
       return {
           isOk: true,
           session: resSession
       }
       } catch (error) {
           return {
               isOk: false,
               error: error
           }
       }
      
  }
}
export interface Resolver {}
