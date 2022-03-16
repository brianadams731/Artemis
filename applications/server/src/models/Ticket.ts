import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Board } from "./Board";


@Entity()
class Ticket extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable:false})
    description: string;

    @Column({nullable:true})
    comment: string;

    @CreateDateColumn()
    openDate: Date;

    @Column({type:"date", nullable:true})
    closeDate: string;

    @ManyToOne(()=> Board, board => board.tickets, {
        onDelete:"CASCADE",
    })
    board: Board;
}

export { Ticket };