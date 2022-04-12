import {MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../models/User";

export class SeedUser1649724639936 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const user = new User();
        user.email = "test@test.com";
        user.password = "test";
        user.username = "testuser";
        await user.save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    
    }

}
