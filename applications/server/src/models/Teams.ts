import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Board } from "./Board";


@Entity()
class Teams extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    name: string;

    // @Column({nullable:true})
    // permissions: string;

    @ManyToOne(()=> Workspaces, workspace => workspace.teams, {
        onDelete:"CASCADE"
        
    })
    board: Board;

}

export { Teams };