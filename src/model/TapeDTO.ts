import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {Field, ObjectType} from 'type-graphql'

export interface TapeDTO{
    id?: string;
    title: string;
    level: number;
    ytUrl: string;
    description: string;
    script: string;
}

@ObjectType()
@Entity('tape')
export class TapePgSchema implements TapeDTO {
    @PrimaryGeneratedColumn()
    @Field()
    public id?: string;
    
    @Column()
    @Field()
    public title!: string;
    
    @Column()
    @Field()
    public ytUrl!: string;
    
    @Column()
    @Field()
    public level!: number;

    @Column()
    @Field()
    public description!: string;

    @Column()
    @Field()
    public script!: string;
}