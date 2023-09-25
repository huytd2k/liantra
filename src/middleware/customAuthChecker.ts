import 'reflect-metadata';
import { AuthChecker } from "type-graphql";
import { ApolloContext } from '../graphql/type/apollo.context';

export const customAuthChecker: AuthChecker<ApolloContext> = ({context}, roles) => {
    const userRole = context.req.session!.userRole;
    if(!userRole) return false;
    if(roles.indexOf(userRole) > -1) return true ;
    return false;
}
