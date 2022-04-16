import express from "express";
import { getRepository } from "typeorm";
import { requireWithUserAsync } from "../middleware/requireWithUserAsync";
import { Board } from "../models/Board";
import { User } from "../models/User";
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

workspaceRoute.get("/debug", async (req, res) => {
    const debug = await getRepository(Workspace)
        .createQueryBuilder("workspace")
        .select(["workspace.id"])
        .getMany();

    console.log(JSON.stringify(debug, null, 2));

    return res.status(200).json(debug);
});

workspaceRoute.get("/byId/:workspaceId", async (req, res) => {
    if (!req.params.workspaceId) {
        return res.status(400).send("Error: Malformed Request");
    }

    const query = await getRepository(Workspace)
        .createQueryBuilder("workspace")
        .select(["workspace.id", "workspace.name"])
        .leftJoinAndSelect("workspace.boards", "boards")
        .orderBy("boards.name")
        .leftJoinAndSelect("boards.tickets", "tickets")
        .where("workspace.id=:workspaceId", { workspaceId: req.params.workspaceId })
        .getOne();

    query?.boards.forEach((item) => {
        item.tickets.sort((a, b) => a.index - b.index);
    });

    // 
    query?.boards.forEach((item, index)=>{
        if(item.name.toLowerCase() === "unassigned"){
            const removed = query?.boards.splice(index,1);
            query?.boards.unshift(removed[0]);
        }
    })



    return res.status(200).json(query);
});

workspaceRoute.post("/add", async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send("Error: Malformed Request");
    }

    const workspace = new Workspace();
    workspace.name = req.body.name;

    console.log("HERE");
    
    const board = new Board();
    board.name = "Unassigned";
    workspace.boards = [board];

    await workspace.save();
    return res.status(200).send("Workspace: Added");
});

workspaceRoute.delete("/byId/:workspaceId", async (req, res) => {
    if(!req.params.workspaceId){
        return res.status(400).send("Error: Malformed Request");
    }
    const workspace = await Workspace.findOne(req.params.workspaceId);
    if(!workspace){
        return res.status(404).send("Error: Workspace not found");
    }
    await workspace.remove();

    return res.status(200).send("Workspace deleted");
});

workspaceRoute.patch("/subscribe/:workspaceId", requireWithUserAsync, async (req, res) => {
    if (!req.user || !req.params.workspaceId) {
        return res.status(400).send("Error: User not auth or invalid workspaceId");
    }
    const user = await getRepository(User)
        .createQueryBuilder("user")
        .select("user.id")
        .leftJoinAndSelect("user.workspaces", "workspace")
        .where("user.id=:userId", { userId: req.user.id })
        .getOne();

    const workspace = await Workspace.findOne(req.params.workspaceId, {
        select: ["id"],
    });

    if (!workspace || !user) {
        return res.status(404).send("Error: Workspace or User not found");
    }
    user.workspaces.push(workspace);
    user.save();
    return res.status(200).send("Subscribed");
});

workspaceRoute.delete("/subscribe/:workspaceId", requireWithUserAsync, async (req, res) => {
    if (!req.user || !req.params.workspaceId) {
        return res.status(400).send("Error: User not auth or invalid workspaceId");
    }
    const user = await getRepository(User)
        .createQueryBuilder("user")
        .select("user.id")
        .leftJoinAndSelect("user.workspaces", "workspace")
        .where("user.id=:userId", { userId: req.user.id })
        .getOne();
    if (!user) {
        return res.status(400).send("Error: User not found");
    }
    const index = user?.workspaces.findIndex((item) => item.id === req.params.workspaceId);
    if (index === -1) {
        return res.status(400).send("Error: Cannot find subscription");
    }
    user?.workspaces.splice(index, 1);
    await user.save();
    return res.status(200).send("Unsubscribed");
});

workspaceRoute.patch("/byId/:workspaceId", async (req, res) => {
    const workspaceId = req.params.workspaceId;
    if (!workspaceId) {
        return res.status(500).send("Error: Please include Workspace ID");
    }
    const workspace = await Workspace.findOne(workspaceId);
    if (!workspace) {
        return res.status(404).send("Error: Workspace not found");
    }
    if (workspace) {
        workspace.name = req.body.name;
    }
    await workspace?.save();
    return res.status(200).send("Workspace updated");
});

workspaceRoute.delete("/byId/:workspaceId", requireWithUserAsync, async (req, res) => {
    // TODO: Test route
    const workspaceId = req.params.workspaceId;
    if (!workspaceId) {
        return res.status(500).send("Error: Workspace id invalid");
    }
    const workspace = await Workspace.findOne(workspaceId);
    const didDelete = await workspace?.remove();
    if (!didDelete) {
        res.status(500).send("Error: Workspace failed to remove");
    }
    return res.status(200).send("Workspace removed");
});

workspaceRoute.get("/users/:workspaceId", async (req, res) => {
    if (!req.params.workspaceId) {
        return res.status(400).send("Error: Malformed Request");
    }
    const users = await getRepository(Workspace)
        .createQueryBuilder("workspace")
        .select("workspace.id")
        .leftJoinAndSelect("workspace.users", "user")
        .where("workspace.id=:workspaceId", { workspaceId: req.params.workspaceId })
        .getOne();

    return res.status(200).json(users);
});
export { workspaceRoute };
