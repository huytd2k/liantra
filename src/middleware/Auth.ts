import { ApolloContext } from './../graphql/type/apollo.context';
import { MiddlewareInterface, ResolverData, NextFn, AuthChecker } from "type-graphql";
import { AuthenticationError } from 'apollo-server-express';
import { injectable } from 'inversify';
import 'reflect-metadata'


@injectable()
export class Auth implements MiddlewareInterface<ApolloContext> {
    async use({args, context}: ResolverData<ApolloContext>, next : NextFn)  {
        if (!context.req.session!.uid) return new AuthenticationError("You don't have permission to access this data!")
        await next();
    }
}

export const customAuthChecker: AuthChecker<ApolloContext> = ({args, info, context, root}, roles) => {
    const userRole = context.req.session!.userRole;
    if(userRole) return false;
    if(roles.indexOf(userRole) > -1) return true;
    return false;
}