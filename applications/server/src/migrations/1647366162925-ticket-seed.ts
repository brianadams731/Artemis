import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Board } from "../models/Board";
import { Ticket } from "../models/Ticket";

export class ticketSeed1647366162925 implements MigrationInterface {
    // this is a migration example if you want to use the TypeORM syntax
    public async up(queryRunner: QueryRunner): Promise<void> {
        const board = await Board.findOne(1,{
            relations:["tickets"]
        });
        for(let i = 0; i<4; i++){
            const ticket = new Ticket();
            ticket.comment = "example comment"
            ticket.description = "test";
            board?.tickets.push(ticket);
        }
        console.log(JSON.stringify(board,null,4));
        await board?.save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tickets = await getRepository(Ticket).createQueryBuilder("ticket")
        .where("board.id = 1")
        .leftJoin("ticket.board","board")
        .getMany();

        tickets.forEach(async (item)=>{
            await item.remove();
        })
    }

}
