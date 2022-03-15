import {MigrationInterface, QueryRunner} from "typeorm";
import { Board } from "../models/Board";

export class boardSeed1647365679398 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const board = new Board();
        board.name = "Milstone 2";
        await board.save();     
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const board = await Board.findOne(1);
        board?.remove();
        board?.save();
    }
}
