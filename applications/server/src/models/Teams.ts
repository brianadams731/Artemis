import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Board } from "./Board";
import { Workspace } from "./Workspace";


@Entity()
class Teams extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    name: string;

    // @Column({nullable:true})
    // permissions: string;

    @ManyToOne(()=> Workspace, workspace => workspace.teams, {
        onDelete:"CASCADE"
        
    })
    workspace: Workspace;

}

export { Teams };