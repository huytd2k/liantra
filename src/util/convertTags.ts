import { Tag } from './../model/Tag';

export function convertTags(tagString : string) : Tag[]{
    return tagString.split(" ").map((stringTag) => new Tag(stringTag))
}