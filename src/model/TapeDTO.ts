import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


export interface TapeDTO{
    id?: string;
    title: string;
    ytUrl: string;
    description: string;
    script: string;
}

@Entity('tape')
export class TapePgSchema implements TapeDTO {
    @PrimaryGeneratedColumn()
    public id?: string;
    
    @Column()
    public title!: string;
    
    @Column()
    public ytUrl!: string;
    
    
    @Column()
    public description!: string;

    @Column()
    public script!: string;
}