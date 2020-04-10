import Express from 'express';

export interface ApolloContext {
    req: Express.Request,
    res: Express.Response,
}