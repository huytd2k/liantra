import { Field, Int } from 'type-graphql';
import { ObjectType } from 'type-graphql';
import { Tape } from '../model/Tape';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

@ObjectType()
@Entity('tag')
export class Tag {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id!: number;

    @Field()
    @Column()
    tagName!: string;

    
    
    @ManyToMany(type => Tape, tape => tape.id) 
    @Field(type => Tape)
    @JoinTable()
    tapeid!: Tape[];

    constructor(tagName: string) {
        this.tagName = tagName;
    }
}