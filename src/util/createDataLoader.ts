import { TagToTape } from './../model/TagToTape';
import { INJECT_TAG } from 'inversify/dts/constants/metadata_keys';
import { In } from 'typeorm';
import { Tag } from '../model/Tag';
import DataLoader, { BatchLoadFn } from 'dataloader';
export const batchTags : BatchLoadFn<Number,Tag[]> = async (keys) => {
    const cnts = await TagToTape.find();
    const tagToTapes = await TagToTape.find(
        {
            join : {
                alias: "tagToTape",
                innerJoinAndSelect: {
                    tag: "tagToTape.tag"
                }
            },
            where: {
                tapeId: In(keys as number[]) 
            }
        }
    )
        console.log(tagToTapes);
    const tapeIdToTags = new Map<number,Tag[]>();
    tagToTapes.forEach(tt => {
        if(tt.tapeId in tapeIdToTags) {
            tapeIdToTags.get(tt.tapeId)!.push((tt as any).__tag__);
        } else {
            tapeIdToTags.set(tt.tapeId,[(tt as any).__tag__]);
        }
    })

    return keys.map(key => tapeIdToTags.get(key as number) || [] || new Error(`No result for ${key}`));
}

export const createTagsLoader = () => new DataLoader(batchTags);



