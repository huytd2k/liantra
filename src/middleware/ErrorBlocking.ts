import { injectable } from 'inversify';
import { MiddlewareInterface, NextFn } from "type-graphql";
import 'reflect-metadata'

@injectable()
export class ErrorBlocking implements MiddlewareInterface {
    async use(_, next : NextFn) {
        try {
            await next()
        }
        catch(err) {
            return 
        }
    }
}