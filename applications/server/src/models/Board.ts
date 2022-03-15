import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Ticket } from "./Ticket";
import { Workspace } from "./Workspace";


@Entity()
class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    name: string;

    @OneToMany(()=>Ticket, ticket => ticket.board,{
        cascade:["insert"],
    })
    tickets: Ticket[];

    @ManyToOne(()=>Workspace, workspace => workspace.boards)
    workspace: Workspace;
}

export { Board };