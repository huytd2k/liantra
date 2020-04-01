import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


export interface UserDTO{
    _id?: string;
    username: string;
    password: string;
}

@Entity('user')
export class UserPgSchema implements UserDTO {
    @PrimaryGeneratedColumn()
    public _id?: string;
    @Column()
    public username!: string;
    @Column()
    public password!: string;
}