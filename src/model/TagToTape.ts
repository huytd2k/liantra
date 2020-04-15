import { BaseEntity, JoinColumn, ManyToOne, PrimaryColumn, Entity } from 'typeorm';
import { Tag } from './Tag';
import { Tape } from './Tape';


@Entity()
export class TagToTape extends BaseEntity {
    @PrimaryColumn()
    tagId!: number;

    @PrimaryColumn()
    tapeId!: number;
   
    @JoinColumn({name: "tagId"})
    @ManyToOne(()=> Tag, tag => tag.tapeConnection, {primary: true})
    tag!: Promise<Tag>;

    @JoinColumn({name: "tapeId"})
    @ManyToOne(()=> Tape, tape => tape.tagConnection, {primary: true})
    tape!: Promise<Tape>;

    constructor(tagId, tapeId) {
        super()
        this.tapeId = tapeId;
        this.tagId = tagId;
    }
}