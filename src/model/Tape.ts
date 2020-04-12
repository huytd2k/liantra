import { IsNotEmpty , Contains } from "class-validator";
import { ObjectType, Field } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable, PrimaryColumn } from 'typeorm';
import { Tag } from "./Tag";


@ObjectType()
@Entity('tape')
export class Tape {
    constructor(
        title: string,
        ytUrl: string,
        level : number,
        description:  string,
        tags: Tag[],        
        script: string,
        ) {
            this.title = title;
            this.ytUrl = ytUrl;
            this.level = level;
            this.description = description;
            this.tags = tags;
            this.script = script
    }
    @Field()
    @PrimaryGeneratedColumn()
    id?: string;

    @Field()
    @IsNotEmpty()
    @PrimaryColumn()
    title!: string;
    

    @Field()
    @Contains("youtube.com")
    @Column()
    ytUrl!: string;
    
    @Field()
    @Column()
    level!: number;

    @Field()
    @Column()
    description!: string;
    
    tagString!: string;
    @Field(type => Tag, {nullable: true})
    @ManyToMany(type => Tag, tag => tag.tagName, {cascade: true})
    @JoinTable()
    tags!: Tag[];
    
    @Field()
    @Column()
    script!: string;
}

