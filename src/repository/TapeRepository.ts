import { TapeDTO, TapePgSchema } from "./../model/TapeDTO";
import { Tape } from "./../model/Tape";
import { injectable } from "inversify";
import {
  createConnection,
  Connection,
  Repository,
  ConnectionOptions,
  DeleteResult,
  Like
} from "typeorm";


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
        try {
            (async () => {
                const conection = await this.connect();
                this.tapeRepositoryFromTypeOrm = conection.getRepository(TapePgSchema);
            })();
        }
        catch(err) {

        }
    }
    public async createTape(tapeDTO: TapeDTO): Promise<TapeDTO> {
        return await this.tapeRepositoryFromTypeOrm.save(tapeDTO);
    }
    deleteTapebyId(queryId: string): Promise<DeleteResult> {
        throw new Error("Method not implemented.");
    }
    updateTape(tapeDTO: TapeDTO): Promise<TapeDTO> {
        throw new Error("Method not implemented.");
    }
    connect(): Promise<Connection> {
        return createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "mike",
            password: "huy221100",
            database: "liantra",
            entities: [TapePgSchema],
        synchronize: true    });
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