import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Workspace } from "./Workspace";


@Entity()
class Team extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable:false})
    name: string;

    @ManyToOne(()=> Workspace, workspace => workspace.teams, {
        onDelete:"CASCADE"
        
    })
    workspace: Workspace;

}

export { Team };