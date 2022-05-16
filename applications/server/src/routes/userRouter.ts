import express from "express";
import { getRepository } from "typeorm";
import { requireWithUserAsync } from "../middleware/requireWithUserAsync";
import { User } from "../models/User";
import { Workspace } from "../models/Workspace";

const userRouter = express.Router();

interface ParsedWorkspace extends Workspace {
    userOwns: boolean;
}

userRouter.get("/workspaces", requireWithUserAsync, async (req, res) => {
    if (!req.user) {
        return res.status(403).send("Error: Not Auth");
    }
    const workspaces = await getRepository(User).createQueryBuilder("user")
    .select("user.id")
    .leftJoinAndSelect("user.workspaces","workspace")
    .where("user.id=:userId",{userId: req.user.id})
    .getOne();

    if(!workspaces){
        return res.status(404).send("Error: Cannot find user")
    }
    
    const parsed = (workspaces.workspaces as ParsedWorkspace[]).map((workspace:any) =>{
        workspace.userOwns = req.user?.id === workspace.ownerId
        return workspace;
    })

    return res.status(200).json(parsed);
});

userRouter.get("/profile", requireWithUserAsync, async (req, res) => {
    if (!req.user) {
        return res.status(403).send("Error: Not Auth");
    }

    return res.status(200).json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
    })
});

userRouter.patch("/update", requireWithUserAsync, async (req, res) => {
    if (!req.user) {
        return res.status(403).send("Error: Not Auth");
    }
});

userRouter.delete("/delete", requireWithUserAsync, async(req,res)=>{
    if (!req.user) {
        return res.status(403).send("Error: Not Auth");
    }
})

export { userRouter };
