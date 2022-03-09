import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    username: string;

    @Column()
    password: string;

    //TODO: Many to many relation   
}