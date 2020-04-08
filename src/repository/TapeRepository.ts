import { UserPgSchema } from './../model/UserDTO';
import { TapeDTO, TapePgSchema } from "./../model/TapeDTO";
import { injectable, id, inject } from "inversify";
import {
	Repository,
	DeleteResult,
} from "typeorm";
import {RepositoryClass} from './Repository.class'
import {PgConnection} from '../util/PgConnection'
import TYPES from '../types'

export interface TapeRepository {
    getAll() : Promise<TapeDTO[]>;
    findTapeById(queryId: string): Promise<TapeDTO>;
    findTapeByTitle(queryTitle: string): Promise<TapeDTO[]>;
    createTape(tapeDTO : TapeDTO): Promise<TapeDTO>;
    deleteTapebyId(queryId: string): Promise<DeleteResult>;
    updateTape(tapeDTO: TapeDTO): Promise<TapeDTO>;
}
@injectable()
export class TapeRepositoryImpPg implements TapeRepository{
    private tapeRepositoryFromTypeOrm!: Repository<TapeDTO>;
	constructor() {
		(async () => {
		const connection = await PgConnection.getConnection();
		this.tapeRepositoryFromTypeOrm =  connection.getRepository(TapePgSchema);
		})();
	}
    public async createTape(tapeDTO: TapeDTO): Promise<TapeDTO> {
    	return await this.tapeRepositoryFromTypeOrm.save(tapeDTO);
    }
    public async deleteTapebyId(queryId: string): Promise<DeleteResult>{
    	return await this.tapeRepositoryFromTypeOrm.createQueryBuilder("tape").delete().where("tape.id = :id", {id: queryId}).execute()
    }
    updateTape(tapeDTO: TapeDTO): Promise<TapeDTO> {
    	throw new Error("Method not implemented.");
    }
    
    
    public async getAll(): Promise<TapeDTO[]> {
    	return await this.tapeRepositoryFromTypeOrm.find()
    }
    public async findTapeById(queryString: string): Promise<TapeDTO> {
    	try {
    		return await this.tapeRepositoryFromTypeOrm.findOneOrFail({id: queryString})
    	} catch(err) {
    		throw new Error('Not Found!')
    	};
    }
    public async findTapeByTitle(queryString: string): Promise<TapeDTO[]> {
    	const foundDTO = await this.tapeRepositoryFromTypeOrm.createQueryBuilder("tape")
    		.where("LOWER(title) like :title", {title: '%'+queryString.toLowerCase()+'%'})
    		.getMany();
    	return foundDTO;
    }

}