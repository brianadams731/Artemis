import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Board } from "./Board";


@Entity()
class Ticket extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    description: string;

    @Column({nullable:true})
    comment: string;

    @CreateDateColumn({nullable:false})
    openDate: Date;

    @Column({type:"date", nullable:true})
    closeDate: string;

    @ManyToOne(()=> Board, board => board.tickets, {
        eager: true,
        onDelete:"CASCADE"
    })
    board: Board;
}

export { Ticket };