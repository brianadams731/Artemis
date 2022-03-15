import {MigrationInterface, QueryRunner} from "typeorm";
import { Board } from "../models/Board";

export class boardSeed1647365679398 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const board = new Board();
        board.name = "Milestone 2";
        await board.save();
        
        const board1 = new Board();
        board.name = "test";
        await board1.save();    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const board = await Board.findOne(1);
        board?.remove();
        board?.save();
    }
}
