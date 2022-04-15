import express from "express";
import { getRepository } from "typeorm";
import { requireWithUserAsync } from "../middleware/requireWithUserAsync";
import { Workspace } from "../models/Workspace";
import { ticketRoute } from "./ticketRoute";

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

/*workspaceRoute.get('/debug',async(req,res)=>{
    const query = await getRepository(Workspace).createQueryBuilder('workspace')
    .select(["workspace.id","workspace.name"])
    .leftJoinAndSelect("workspace.boards","boards")
    .leftJoinAndSelect("boards.tickets","tickets")
    .where("workspace.name='Artemis Backend'")
    .getOne();

    //TODO: sort in database!!!
    query?.boards.forEach((item)=>{
        item.tickets.sort((a,b)=>a.index - b.index);
    })

    //console.log(JSON.stringify(query, null, 2));
    
    return res.status(200).json(query);
})*/

workspaceRoute.get("/byId/:workspaceId", async (req,res)=>{
    if(!req.params.workspaceId){
        return res.status(400).send("Error: Malformed Request");
    }

    const query = await getRepository(Workspace).createQueryBuilder('workspace')
    .select(["workspace.id","workspace.name"])
    .leftJoinAndSelect("workspace.boards","boards")
    .leftJoinAndSelect("boards.tickets","tickets")
    .where("workspace.id=:workspaceId",{workspaceId: req.params.workspaceId})
    .getOne();

    //TODO: sort in database!!!
    query?.boards.forEach((item)=>{
        item.tickets.sort((a,b)=>a.index - b.index);
    })
    
    return res.status(200).json(query);
})
workspaceRoute.post("/byId/:workspaceId", (req, res) => {
    console.log(req.params.workspaceId);
    console.log(req.body);
    return res.status(204).send();
});

workspaceRoute.put("/byId/:workspaceId/workspaceOrg", requireWithUserAsync, async (req, res) => {
    const workspaceId = req.params.workspaceId;

    if (!workspaceId) {
        return res.status(500).send("Error: Please include Workspace ID");
    }

    if (!workspaceId) {
        return res.status(500).send("Error: workspace id invalid");
    }

    const workspace = await Workspace.findOne(workspaceId);

    if(workspace) {
        workspace.name = req.body.name;
    }
    await workspace?.save();

    return res.status(200).send("Workspace updated");

});

workspaceRoute.delete("/byId/:workspaceId", requireWithUserAsync, async (req, res) => {
    // TODO: Test route
    const workspaceId = req.params.workspaceId;
    if(!workspaceId){
        return res.status(500).send("Error: Workspace id invalid");
    }
    const workspace = await Workspace.findOne(workspaceId);

    const didDelete = await workspace?.remove();
    if(!didDelete){
        res.status(500).send("Error: Workspace failed to remove");
    }
    return res.status(200).send("Workspace removed");
});

export { workspaceRoute };
