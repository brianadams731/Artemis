import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Users } from "./Users";
import { Workspace } from "./Workspace";

@Entity()
class Organization extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true, nullable:false})
    name:string;

    @OneToMany(()=>Users, user => user.organization)
    members: Users;

    @OneToMany(()=>Workspace, workspace => workspace.organization)
    workspaces: Workspace;
}

export { Organization };