import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Board } from "../models/Board";
import { Ticket } from "../models/Ticket";

export class initalSeed1647398112230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const board = new Board();
        board.name = "Unassigned";
        board.tickets = [];
        for(let i = 0; i<3; i++){
            const ticket = new Ticket();
            ticket.comment = `Comment ${i+1}`
            ticket.description = `Ticket ${i+1}`;
            board.tickets.push(ticket);
        }
        await board.save();

        const board1 = new Board();
        board1.name = "Dave";
        board1.tickets = [];
        for(let i = 0; i<3; i++){
            const ticket = new Ticket();
            ticket.comment = `Dave's Comment ${i+1}`
            ticket.description = `Dave's Ticket ${i+1}`;
            board1.tickets.push(ticket);
        }
        await board1.save();

        const board2 = new Board();
        board2.name = "Janice";
        board2.tickets = [];
        for(let i = 0; i<3; i++){
            const ticket = new Ticket();
            ticket.comment = `Janice's Comment ${i+1}`
            ticket.description = `Janice's Ticket ${i+1}`;
            board2.tickets.push(ticket);
        }
        await board2.save();  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await getRepository(Board).createQueryBuilder("board")
        .delete()
        .where("board.name = Janice or board.name = Dave or board.name = Unassigned")
        .execute();
    }

}
