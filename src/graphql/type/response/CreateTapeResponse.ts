import { ObjectType } from 'type-graphql';
import { IResponse } from './IResponse';
import { Tape } from '../../../model/Tape';
import { Field } from 'type-graphql';

@ObjectType()
export class CreateTapeResponse implements IResponse{
    @Field()
    isOk!: boolean;
    
    @Field()
    error?: string;
    
    @Field(()=> Tape)
    tapeInfo?: Tape;
}