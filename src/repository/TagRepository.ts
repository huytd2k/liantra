import { getRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { Tag } from "../model/Tag";
import { injectable } from 'inversify';

export interface TagReposiory {
    getAll() : Promise<Tag[]>;
    createTag(tag : Tag) : Promise<Tag>;
    findTag(tagName: string): Promise<Tag | undefined>;
}


@injectable()
export class TagRepositoryImpl implements TagReposiory {
    private tagRepositoryFromTypeorm! :Repository<Tag>;
    constructor() {
        (async () => {
            this.tagRepositoryFromTypeorm = await getRepository(Tag);
        })();
    }
    public async getAll(): Promise<Tag[]> {
        return this.tagRepositoryFromTypeorm.find();
    }
    
    public async createTag(tag: Tag): Promise<Tag> {
        return await this.tagRepositoryFromTypeorm.save(tag);
    }

    public async findTag(tagName: string) : Promise<Tag | undefined> {
        return await this.tagRepositoryFromTypeorm.findOne({tagName: tagName});
    }
}