import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Organization } from "./Organization";
import { Workspace } from "./Workspace";

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @ManyToOne(() => Organization, (organization) => organization.members)
    organization: Organization;

    @ManyToMany(() => Workspace, (workspace) => workspace.users)
    @JoinTable()
    workspaces: Workspace[];
}

export { User };
