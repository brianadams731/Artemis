import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Ticket } from "./Ticket";
import { Workspace } from "./Workspace";


@Entity()
class Board extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable:false})
    name: string;

    @OneToMany(()=>Ticket, ticket => ticket.board,{
        cascade:["insert"],
    })
    tickets: Ticket[];

    @ManyToOne(()=>Workspace, workspace => workspace.boards,{
        onDelete:"CASCADE"
    })
    workspace: Workspace;
}

export { Board };