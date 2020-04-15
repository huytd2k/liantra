import DataLoader  from 'dataloader';
import Express from 'express';
import { Tag } from '../../model/Tag';

export interface ApolloContext {
    req: Express.Request,
    res: Express.Response,
    tagsLoader: DataLoader<number, Tag[], number>,
}