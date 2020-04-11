import { ValidateTapeArgs } from './../../middleware/ValidateTapeArgs';
import { TapeInput } from './../type/input/TapeInput';
import { CreateTapeResponse } from './../type/response/CreateTapeResponse';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Arg, Mutation, Query, Resolver, UseMiddleware, Authorized } from "type-graphql";
import { Tape } from '../../model/Tape';
import { TapeService } from '../../service/TapeService';
import TYPES from '../../types';

@Resolver()
@injectable()
export class TapeResolver implements Resolver{
    @inject(TYPES.TapeService) private tapeService! : TapeService;
    @Query(() => [Tape])
    async tapes() {
        const found = await this.tapeService.findTapebyTitle("");
        console.log(found);
        return found
    }

    @Query(() => [Tape])
    async tape(@Arg("title") title :string) : Promise<Tape[]> {
        return await this.tapeService.findTapebyTitle(title);
    }
    @Authorized("ADMIN")
    @Mutation(() => Boolean)
    async delete(@Arg("id") id: number)  {
        const result = await this.tapeService.deleteTapeById(id);
        return result;
    }
    @Authorized("ADMIN")
    @Mutation(() => CreateTapeResponse) 
    async add(@Arg("tape") tape: TapeInput) : Promise<CreateTapeResponse> {
       try {
           const resTape = await this.tapeService.createTape(tape);
           return {
               isOk: true,
               tapeInfo: resTape,
           }
       } catch(err) {
           return {
               isOk: false,
               error: err.message,
           }
       }
    }
}
export interface Resolver {

}