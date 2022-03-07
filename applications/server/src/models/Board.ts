import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Ticket } from "./Ticket";


@Entity()
class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    name:string;

    @OneToMany(()=>Ticket, ticket => ticket.board)
    tickets: Ticket;
}

export { Board };