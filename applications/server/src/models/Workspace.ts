import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, OneToOne, JoinColumn } from "typeorm";
import { Board } from "./Board";
import { Organization } from "./Organization";
import { Team } from "./Team";
import { User } from "./User";


@Entity()
class Workspace extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    name: string;

    @ManyToOne(() => Organization, organization => organization.workspaces)
    organization: Organization;

    @OneToMany(()=>Board, (boards) => boards.workspace,{
        cascade:["update","insert"]
    })
    boards: Board[];

    @ManyToOne(()=> User, (user) => user.ownsWorkspaces, {
        nullable: false,
        onDelete: "CASCADE",
        cascade:["update", "insert"]
    })
    @JoinColumn({name:"ownerId"})
    owner: User
    @Column({ name: 'ownerId'})
    ownerId: string;

    @OneToMany(() => Team, (team) => team.workspace)
    teams: Team[];

    @ManyToMany(()=>User, (user)=> user.workspaces)
    users: User[];
}

export { Workspace };