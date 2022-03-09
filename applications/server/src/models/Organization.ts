import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Workspace } from "./Workspace";

@Entity()
class Organization extends BaseEntity {
    @PrimaryColumn()
    name: string;

    @OneToMany(()=>User, user => user.organization)
    members: User;

    @OneToMany(()=>Workspace, workspace => workspace.organization)
    workspaces: Workspace;
}

export { Organization };