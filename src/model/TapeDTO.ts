import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


export class TapeDTO{
    _id?: string;
    ytUrl!: string;
    description!: string;
    sciprt!: string;
}

@Entity('tape')
export class TapePgSchema implements TapeDTO {
    @PrimaryGeneratedColumn()
    public _id?: string;
    
    
    @Column()
    public ytUrl!: string;
    
    
    @Column()
    public description!: string;

    @Column()
    public sciprt!: string;
}