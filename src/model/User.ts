import * as bcrypt from "bcryptjs";
import { IsNotEmpty, Length } from "class-validator";
import "reflect-metadata";
import { Field, ObjectType, Int } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ROLE } from './Role';
import { Session } from './Session';
@ObjectType()
@Entity()
@Unique(["username","email"])
export class User extends BaseEntity {
  //* Domain class
  @Field(() => Int)
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


  @OneToMany(() => Session, (session) => session.user, {eager: true})
  @JoinColumn()
  sessions!: Session[];

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
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = ROLE.member ;
  }
}
