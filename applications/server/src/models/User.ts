import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./Organization";

@Entity()
class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    username: string;

    @Column()
    password: string;

    @ManyToOne(()=>Organization, (organization) => organization.members)
    organization:Organization;
    
    //TODO: Many to many relation   
}

export { User }