import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
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

    @Column()
    index: number;
    
    @ManyToOne(()=> Board, board => board.tickets, {
        onDelete:"CASCADE",
    })
    @JoinColumn({name:"board_id"})
    board: Board;
}

export { Ticket };