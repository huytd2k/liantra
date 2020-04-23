import { Field } from 'type-graphql';
import { ObjectType } from 'type-graphql';
import { User } from "../../../model/User";


@ObjectType()
export class MeReponse {
    @Field()
    isOk!: boolean;
    @Field(type => User, {nullable: true})
    user?: User;
}