import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Arg, Mutation, Query, Resolver } from "type-graphql";
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
    @Mutation(() => Boolean)
    async delete(@Arg("id") id: number)  {
        const result = await this.tapeService.deleteTapeById(id);
        return result;
        return false;
    }
}
export interface Resolver {

}