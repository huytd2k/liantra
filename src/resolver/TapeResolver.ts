import { TapePgSchema } from '../model/TapeDTO';
import { injectable, inject } from 'inversify';
import { UserRepository } from '../repository/UserRepository';
import { RepositoryClass } from '../repository/Repository.class';
import { Tape } from '../model/Tape';
import { Resolver, Query } from "type-graphql"
import 'reflect-metadata'
import TYPES from '../types';
import { Repository, Connection } from 'typeorm';
import { UserPgSchema } from '../model/UserDTO';
import {PgConnection} from '../util/PgConnection'
import {TapeDTO} from '../model/TapeDTO'

@Resolver()
@injectable()
export class TapeResolver {
    private tapeRepositoryFromTypeOrm!: Repository<TapeDTO>;
	constructor() {
		(async() => {
            const connection = await PgConnection.getConnection();
            this.tapeRepositoryFromTypeOrm = connection.getRepository(TapePgSchema);
        })();
	}

    @Query(() => [TapePgSchema])
    async tape() {
        
        const found = await this.tapeRepositoryFromTypeOrm.find();
        console.log(found);
        return found
    }
}