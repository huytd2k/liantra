import { injectable } from "inversify";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { Tape } from "../model/Tape";
import { Tag } from "../model/Tag";

export interface TapeRepository {
	getAll(): Promise<Tape[]>;
	findTapeById(queryId: string): Promise<Tape>;
	findTapeByTitle(queryTitle: string): Promise<Tape[]>;
	createTape(tape: Tape): Promise<Tape>;
	deleteTapebyId(queryId: number): Promise<DeleteResult>;
	updateTape(tape: Tape): Promise<Tape>;
}
@injectable()
export class TapeRepositoryImpPg implements TapeRepository {
	private tapeRepositoryFromTypeOrm!: Repository<Tape>;
	private tagRepositoryFromTypeOrm!: Repository<Tag>;
	constructor() {
		(async () => {
			this.tapeRepositoryFromTypeOrm = getRepository(Tape);
			this.tagRepositoryFromTypeOrm = getRepository(Tag);
		})();
	}

	public async createTape(tape: Tape): Promise<Tape> {
		return await this.tapeRepositoryFromTypeOrm.save(tape);
	}
	public async deleteTapebyId(queryId: number): Promise<DeleteResult> {
		return await this.tapeRepositoryFromTypeOrm.createQueryBuilder("tape").delete().where("tape.id = :id", { id: queryId }).execute()
	}
	updateTape(Tape: Tape): Promise<Tape> {
		throw new Error("Method not implemented.");
	}


	public async getAll(): Promise<Tape[]> {
		return await this.tapeRepositoryFromTypeOrm.find({ relations: ["tag"] })
	}
	public async findTapeById(queryString: string): Promise<Tape> {
		try {
			return await this.tapeRepositoryFromTypeOrm.findOneOrFail({ id: queryString })
		} catch (err) {
			throw new Error('Not Found!')
		};
	}
	public async findTapeByTitle(queryString: string): Promise<Tape[]> {
		const foundDTO = await this.tapeRepositoryFromTypeOrm.createQueryBuilder("tape").leftJoinAndSelect("tape.tags", "tag")
			.where("LOWER(title) like :title", { title: '%' + queryString.toLowerCase() + '%' })
			.getMany();
		return foundDTO;
	}

}