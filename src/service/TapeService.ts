import { TapeDTO } from "./../model/TapeDTO";
import { TapeRepository } from "./../repository/TapeRepository";
import { Tape } from "./../model/Tape";
import { injectable, inject } from "inversify";
import TYPES from "../types";
import { DeleteResult } from "typeorm";

export interface TapeService {
  getAllTape(): Promise<Tape[]>;
  createTape(tape: Tape): Promise<Tape>;
  findTapebyTitle(titleQuery: string): Promise<Tape[]>;
  findTapebyId(id: string) : Promise<Tape>;
  deleteTapeById(id: string): Promise<DeleteResult> ;
}

@injectable()
export class TapeServiceImpl implements TapeService {
    @inject(TYPES.TapeRepository) private tapeRepository! : TapeRepository;
    public async getAllTape(): Promise<Tape[]> {
        const foundDTO = await this.tapeRepository.getAll()
        return foundDTO.map(dto => this.dtoToTape(dto))
    }
    public async createTape(tape: Tape): Promise<Tape> {
        const tapeDTO = this.tapeToDTO(tape);
        const returnDTO = await this.tapeRepository.createTape(tapeDTO);
        return this.dtoToTape(returnDTO)
    }
    public async findTapebyId(id: string) : Promise<Tape> {
        const foundDTO = await this.tapeRepository.findTapeById(id);
        return this.dtoToTape(foundDTO);
    }
    public async findTapebyTitle(titleQuery: string): Promise<Tape[]> {
            const foundDtos = await this.tapeRepository.findTapeByTitle(titleQuery)
            const tapes = foundDtos.map((dto) => this.dtoToTape(dto));
            return tapes}
        
    public async deleteTapeById(id: string): Promise<DeleteResult> {
        return await this.tapeRepository.deleteTapebyId(id)
    }
    public dtoToTape(tapeDTO : TapeDTO) : Tape{
        return {
            id: tapeDTO.id,
            title: tapeDTO.title,
            description: tapeDTO.description,
            script: tapeDTO.script,
            ytUrl: tapeDTO.ytUrl
        }
    }
public tapeToDTO(tape : Tape) {
        return {
            id: tape.id,
            title: tape.title,
            description: tape.description,
            script: tape.script,
            ytUrl: tape.ytUrl
        }
    }
}