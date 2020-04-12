import { TagReposiory } from './../repository/TagRepository';
import { inject, injectable } from "inversify";
import { DeleteResult } from "typeorm";
import TYPES from "../types";
import { Tape } from "./../model/Tape";
import { TapeRepository } from "./../repository/TapeRepository";
import { Tag } from '../model/Tag';

export interface TapeService {
    getAllTape(): Promise<Tape[]>;
    createTape(tape: Tape): Promise<Tape>;
    findTapebyTitle(titleQuery: string): Promise<Tape[]>;
    findTapebyId(id: string): Promise<Tape>;
    deleteTapeById(id: number): Promise<DeleteResult>;
    findTapeByTag(tagName: string): Promise<Tape[]>
}

@injectable()
export class TapeServiceImpl implements TapeService {
    @inject(TYPES.TapeRepository) private tapeRepository!: TapeRepository;
    @inject(TYPES.TagRepository) private tagRepository!: TagReposiory;
    public async getAllTape(): Promise<Tape[]> {
        return await this.tapeRepository.getAll()
    }
    public async createTape(tape: Tape): Promise<Tape> {
        tape.tags.forEach(async tag => {
            let foundTag = await this.tagRepository.findTag(tag.tagName);
            if (foundTag === undefined) {
                await this.tagRepository.createTag(tag);
            }
            else {
                tag.id = foundTag!.id;
            }
        })

        return await this.tapeRepository.createTape(tape);
    }
    public async findTapebyId(id: string): Promise<Tape> {
        return await this.tapeRepository.findTapeById(id);
    }
    public async findTapebyTitle(titleQuery: string): Promise<Tape[]> {
        return await this.tapeRepository.findTapeByTitle(titleQuery)
    }

    public async deleteTapeById(id: number): Promise<DeleteResult> {
        return await this.tapeRepository.deleteTapebyId(id)
    }
    public async findTapeByTag(tag: string): Promise<Tape[]> {
        return await this.tapeRepository.findTapeByTag(tag);
    }
}
