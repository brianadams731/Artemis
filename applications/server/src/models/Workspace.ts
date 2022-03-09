import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";


@Entity()
class Workspace extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @ManyToOne(() => Organization, organization => organization.Workspace)
    organization: Organization;

    @OneToMany(() => Teams, teams => teams.Workspace)
    teams: Teams;
}

export { Workspace };