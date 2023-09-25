import DataLoader  from 'dataloader';
import Express from 'express';
import { Tag } from '../../model/Tag';

export interface ApolloContext {
    req: any,
    res: Express.Response,
    tagsLoader: DataLoader<number, Tag[], number>,
    session: any
}
