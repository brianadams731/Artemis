import {MigrationInterface, QueryRunner} from "typeorm";
import { Board } from "../models/Board";

export class boardSeed1647365679398 implements MigrationInterface {

    // This is an example migration if your more comfortable with sql
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.connect();
        await queryRunner.query(`
            INSERT INTO board (name)
            VALUES ('Milestone 2');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.connect();
        await queryRunner.query(`
            DELETE FROM board
            WHERE name='Milestone 2';
        `)
    }

}
