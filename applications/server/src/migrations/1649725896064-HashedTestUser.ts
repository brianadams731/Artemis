import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../models/User";
import { generateHashedPasswordAsync } from "../utils/passwordHash";

export class HashedTestUser1649725896064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userToDelete = await getRepository(User).createQueryBuilder("user")
        .where("user.username = 'testuser'")
        .getOne();
        await userToDelete?.remove();
        
        const user = new User();
        user.email = "test@test.com";
        user.password = await generateHashedPasswordAsync("test");
        user.username = "testuser";
        await user.save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
