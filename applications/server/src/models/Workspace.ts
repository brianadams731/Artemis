import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Board } from "./Board";
import { Organization } from "./Organization";
import { Team } from "./Team";


@Entity()
class Workspace extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @ManyToOne(() => Organization, organization => organization.workspaces)
    organization: Organization;

    @OneToMany(()=>Board, boards => boards.workspace)
    boards: Board;

    @OneToMany(() => Team, team => team.workspace)
    teams: Team;
}

export { Workspace };