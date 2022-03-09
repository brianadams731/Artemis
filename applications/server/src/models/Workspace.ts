import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Organization } from "./Organization";
import { Teams } from "./Teams";


@Entity()
class Workspace extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @ManyToOne(() => Organization, organization => organization.workspaces)
    organization: Organization;

    @OneToMany(() => Teams, teams => teams.workspace)
    teams: Teams;
}

export { Workspace };