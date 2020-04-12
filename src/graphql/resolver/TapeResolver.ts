import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Tag } from '../../model/Tag';
import { Tape } from '../../model/Tape';
import TYPES from '../../types';
import { convertTags } from '../../util/convertTags';
import { TapeService } from './../../service/TapeService';
import { TapeInput } from './../type/input/TapeInput';
import { CreateTapeResponse } from './../type/response/CreateTapeResponse';

@Resolver()
@injectable()
export class TapeResolver implements Resolver{
    @inject(TYPES.TapeService) private tapeService! : TapeService;
    @Query(() => [Tape])
    async tapes() {
        const found = await this.tapeService.findTapebyTitle("");
        return found
    }
    @Query(() => [Tape])
    async findByTag(@Arg("tagName") tagName: string) : Promise<Tape[]> {
        return await this.tapeService.findTapeByTag(tagName);
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
    @Mutation(() => CreateTapeResponse) 
    async add(@Arg("tape") tapeInput: TapeInput) : Promise<CreateTapeResponse> {
       try {
           const convertedTag : Tag[] = convertTags(tapeInput.tags);
           const tape = new Tape(tapeInput.title,tapeInput.ytUrl,tapeInput.level,tapeInput.description,convertedTag, tapeInput.script);
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