import express from "express";
import { getRepository } from "typeorm";
import { Workspace } from "../models/Workspace";

const workspaceRoute = express.Router();
// This interface needs to be returned in the get method
interface IWorkspace {
    id: string;
    name: string;
    boards: IBoard[];
}
// These are interfaces that make ^
interface IBoard {
    id: string;
    name: string;
    tickets: ITicket[];
}
interface ITicket {
    id: string;
    description: string;
}
workspaceRoute.get('/debug',async(req,res)=>{
    const query = await getRepository(Workspace).createQueryBuilder('workspace')
    .select(["workspace.id","workspace.name"])
    .leftJoinAndSelect("workspace.boards","boards")
    .leftJoinAndSelect("boards.tickets","tickets")
    .where("workspace.name='Artemis Backend'")
    .getOne();
    console.log(query);
    
    return res.status(200).json(query);
})
workspaceRoute.get("/byId/:workspaceId", (req, res) => {
    // Do not delete test included below until an a valid response is provided
    console.log(req.params.workspaceId);
    if (req.params.workspaceId === "testDoNotDelete") {
        return res.status(200).json({
            id: "1",
            name: "Workspace 1",
            boards: [
                {
                    id: "board1",
                    name: "Unassigned",
                    tickets: [
                        {
                            id: "ticket1",
                            description: "This is a test",
                        },
                        {
                            id: "ticket2",
                            description: "Ticket 2",
                        },
                        {
                            id: "ticket3",
                            description: "Ticket 3",
                        },
                    ],
                },
                {
                    id: "board2",
                    name: "Person 1",
                    tickets: [
                        {
                            id: "ticket4",
                            description: "Ticket 4",
                        },
                        {
                            id: "ticket5",
                            description: "Ticket 5",
                        },
                    ],
                },
            ],
        });
    }
});

workspaceRoute.post("/byId/:workspaceId", (req, res) => {
    console.log(req.params.workspaceId);
    console.log(req.body);
    return res.status(204).send();
});

export { workspaceRoute };
