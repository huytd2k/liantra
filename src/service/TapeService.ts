import { Length } from 'class-validator';
import { inject, injectable } from "inversify";
import { DeleteResult } from "typeorm";
import TYPES from "../types";
import { Tag } from "./../model/Tag";
import { TagToTape } from "./../model/TagToTape";
import { Tape } from "./../model/Tape";
import { TagReposiory } from "./../repository/TagRepository";
import { TapeRepository } from "./../repository/TapeRepository";

export interface TapeService {
  getAllTape(): Promise<Tape[]>;
  createTape(tape: Tape): Promise<Tape>;
  findTapebyTitle(titleQuery: string): Promise<Tape[]>;
  findTapebyId(id: number): Promise<Tape>;
  deleteTapeById(id: number): Promise<DeleteResult>;
  findTapeByTag(tagName: string): Promise<Tape[]>;
  createTag(tagName: string): Promise<Tag>;
  createCnt(tagId: number, tapeId: number): Promise<TagToTape>;
}

@injectable()
export class TapeServiceImpl implements TapeService {
  @inject(TYPES.TapeRepository) private tapeRepository!: TapeRepository;
  public async getAllTape(): Promise<Tape[]> {
    return Tape.find();
  }
  public async createTape(tape: Tape): Promise<Tape> {
    const resTape = await Tape.save(tape);
    return resTape;
  }
  public async findTapebyId(id: number): Promise<Tape> {
    return await Tape.findOneOrFail({ tapeId: id });
  }
  public async findTapebyTitle(titleQuery: string): Promise<Tape[]> {
    return await Tape.createQueryBuilder('tape').where('tape.title LIKE :title',{title: `%${titleQuery}%`}).getMany();
  }

  public async deleteTapeById(id: number): Promise<DeleteResult> {
    const foundTape = await Tape.findOne({tapeId: id});
    if(foundTape === undefined) {
      throw new Error("Invalid tape ID!");
    }
    else {
      return await Tape.delete(foundTape);
    }
  }
  public async findTapeByTag(tag: string): Promise<Tape[]> {
    throw new Error("Not Implmented");
  }
  public async createTag(tag: string): Promise<Tag> {
    const tryFindTag = await Tag.find({tagName: tag});
    if ((tryFindTag).length !== 0 ) {
        throw new Error("This tag  existed!");
    }
    const resTag = await Tag.save(new Tag(tag));
    return resTag;
  }
  public async createCnt(tagId: number, tapeId: number): Promise<TagToTape> {
    const res = await TagToTape.save(new TagToTape(tagId, tapeId));
    return res;
  }
}
