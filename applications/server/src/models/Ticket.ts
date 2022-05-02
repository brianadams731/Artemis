import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Board } from "./Board";

export enum priorityEnum {
    LOW = 0,
    MEDIUM = 1,
    HIGH = 2
}

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

    @Column({type:"timestamptz", nullable:true})
    closeDate: string;
    

    @Column({
        type: "enum",
        enum:priorityEnum,
        default:priorityEnum.LOW
    })
    priority:priorityEnum

    @Column()
    index: number;
    
    @ManyToOne(()=> Board, board => board.tickets, {
        onDelete:"CASCADE",
    })
    @JoinColumn({name:"board_id"})
    board: Board;
}

export { Ticket };