import { injectable } from "inversify";
import { MiddlewareInterface, ResolverData, NextFn } from "type-graphql";

@injectable()
export class LogAccess implements MiddlewareInterface {
    constructor() {}
  
    async use({ context, info }: ResolverData, next: NextFn) {  
        console.log("Usedmdw")
        return next();
    }
  }