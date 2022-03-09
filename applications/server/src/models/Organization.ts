import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
class Organization extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true, nullable:false})
    name:string;

    @OneToMany(()=>Members, member => member.organization)
    members: Members;

    @OneToMany(()=>Workspace, workspace => workspace.organization)
    workspaces: Workspace;
}

export { Organization };