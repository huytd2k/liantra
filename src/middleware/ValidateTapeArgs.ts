import { NextFn, MiddlewareFn } from 'type-graphql';
import { ResolverData } from 'type-graphql';
import { MiddlewareInterface } from 'type-graphql';
import { injectable } from "inversify";

@injectable()
export class ValidateTapeArgs implements MiddlewareInterface {
    async use({args} : ResolverData, next: NextFn) {
        throw new Error("Sm err");
    }
}