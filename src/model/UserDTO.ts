import { ROLE } from './Role';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


export class UserDTO{
    _id?: string;
    username!: string;
    password!: string;
    role!: ROLE;
}

@Entity('user')
export class UserPgSchema implements UserDTO {
    @PrimaryGeneratedColumn()
    public _id?: string;
    
    
    @Column()
    public username!: string;
    
    
    @Column()
    public password!: string;

    @Column({type: 'varchar'})
    public role!: ROLE;
}