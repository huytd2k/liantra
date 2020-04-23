import { inject, injectable } from "inversify";
import "reflect-metadata";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Tape } from "../../model/Tape";
import { TapeService } from "../../service/TapeService";
import TYPES from "../../types";
import { TapeInput } from "../type/input/TapeInput";
import { CreateTagResponse } from "../type/response/CreateTagResponse";
import { CreateTapeResponse } from "../type/response/CreateTapeResponse";

@Resolver()
@injectable()
export class TapeResolver implements Resolver {
  @inject(TYPES.TapeService) private tapeService!: TapeService;
  @Query(() => [Tape])
  async tapes() {
    const found = await this.tapeService.getAllTape();
    return found;
  }
  @Query(() => [Tape])
  async findByTag(@Arg("tagName") tagName: string): Promise<Tape[]> {
    return await this.tapeService.findTapeByTag(tagName);
  }

  @Query(() => [Tape])
  async tape(@Arg("title") title: string): Promise<Tape[]> {
    return await this.tapeService.findTapebyTitle(title);
  }
  @Authorized("ADMIN")
  @Mutation(() => Boolean)
  async delete(@Arg("id") id: number) {
    const result = await this.tapeService.deleteTapeById(id);
    return result;
  }
  @Mutation(() => CreateTapeResponse)
  async addTape(
    @Arg("tape") tapeInput: TapeInput
  ): Promise<CreateTapeResponse> {
    try {
      const tape = new Tape(
        tapeInput.title,
        tapeInput.ytUrl,
        tapeInput.level,
        tapeInput.description,
        tapeInput.script
      );
      const resTape = await this.tapeService.createTape(tape);
      return {
        isOk: true,
        tapeInfo: resTape,
      };
    } catch (err) {
      return {
        isOk: false,
        error: err.message,
      };
    }
  }
  @Mutation(() => CreateTagResponse)
  async addTag(@Arg("tag") tagName: string): Promise<CreateTagResponse> {
    try {
      const resTag =await this.tapeService.createTag(tagName);
      return {
        isOk: true,
        tagInfo: resTag
        
      }
    } catch(err) {
      return {
        isOk: false
      }
    }
  }
  @Mutation(() => CreateTapeResponse)
  async addTagTapeCnt(@Arg("tagId") tagId: number, @Arg("tapeId") tapeId: number): Promise<CreateTapeResponse> {
      try {
        await this.tapeService.createCnt(tagId, tapeId)
        return {
          isOk: true
        }
      }
      catch(err) {
        return {
          isOk: false,
          error: err.message
        }
      }
  }
  @Query(() => Tape)
  async getTapebyId(@Arg("tapeId") tapeId: number): Promise<Tape> {
      return await this.tapeService.findTapebyId(tapeId);
  }
}
export interface Resolver {}
