import { injectable } from "inversify";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { TapeDTO, TapePgSchema } from "./../model/TapeDTO";

export interface TapeRepository {
    getAll() : Promise<TapeDTO[]>;
    findTapeById(queryId: string): Promise<TapeDTO>;
    findTapeByTitle(queryTitle: string): Promise<TapeDTO[]>;
    createTape(tapeDTO : TapeDTO): Promise<TapeDTO>;
    deleteTapebyId(queryId: number): Promise<DeleteResult>;
    updateTape(tapeDTO: TapeDTO): Promise<TapeDTO>;
}
@injectable()
export class TapeRepositoryImpPg implements TapeRepository{
	private tapeRepositoryFromTypeOrm!: Repository<TapeDTO>;

	constructor() {
		(async () => {
		this.tapeRepositoryFromTypeOrm =  getRepository(TapePgSchema);
		})();
	}

    public async createTape(tapeDTO: TapeDTO): Promise<TapeDTO> {
    	return await this.tapeRepositoryFromTypeOrm.save(tapeDTO);
    }
    public async deleteTapebyId(queryId: number): Promise<DeleteResult>{
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