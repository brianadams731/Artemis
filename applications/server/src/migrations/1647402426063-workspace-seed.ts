import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Board } from "../models/Board";
import { Workspace } from "../models/Workspace";

export class workspaceSeed1647402426063 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = await getRepository(Board).createQueryBuilder("board")
        .where("board.name = 'Janice' or board.name = 'Dave' or board.name = 'Unassigned'")
        .getMany();

        const workspace = new Workspace();
        workspace.name = "Artemis Backend";
        workspace.boards = query;
        await workspace.save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
