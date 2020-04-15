import { ROLE } from './Role';
import * as bcrypt from "bcryptjs";
import { IsNotEmpty, Length } from "class-validator";
import "reflect-metadata";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
@ObjectType()
@Entity("user")
@Unique(["username","email"])
export class User extends BaseEntity {
  //* Domain class
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Length(6, 20)
  @IsNotEmpty()
  @Column()
  username!: string;

  @IsNotEmpty()
  @Column()
  password!: string;

  @IsNotEmpty()
  @Field()
  @Column()
  email!: string | "";

  @IsNotEmpty()
  @Column()
  role!: string;

  async hashPassword() {
    const hashedPwd = await bcrypt.hashSync(this.password);
    this.password = hashedPwd;
  }

  checkHashedPwdIsValid(uncryptedPwd: string) {
    return bcrypt.compareSync(uncryptedPwd, this.password);
  }

  constructor(
    username : string,
    password : string,
    email : string ,
  ) {
    super();
    this.username = username,
    this.password = password,
    this.email = email
    this.role = ROLE.member 
  }
}
