import express from "express";
import { getRepository } from "typeorm";
import { Board } from "../models/Board";
import { Ticket } from "../models/Ticket";

var cors = require("cors");
const errorTrackerRouter = express.Router();

errorTrackerRouter.options("/", cors());
errorTrackerRouter.post("/", cors(), async (req, res) => {
    if (!req.body.stacktrace || !req.body.message) {
        return res.send(400).send();
    }

    const board = await getRepository(Board)
        .createQueryBuilder("board")
        .select(["board.id", "tickets.id"])
        .innerJoin("board.workspace", "workspace")
        .leftJoin("board.tickets","tickets")
        .where("workspace.id = :workspaceId", { workspaceId: req?.body?.workspaceId })
        .andWhere("board.name = :boardName", { boardName: "Unassigned" })
        .getOne();

    if (!board) {
        return res.send(404).send();
    }

    const ticketComment = `
        Stack trace: ${req.body.stacktrace}\n
        Client: ${req.body.client}\n
        Location: ${req.body.location}
    `;

    const checkForDuplicate = await getRepository(Ticket)
        .createQueryBuilder("ticket")
        .select("COUNT(*)","count")
        .innerJoin("ticket.board","board")
        .where("board.id=:boardId", { boardId: board?.id })
        .andWhere("ticket.comment = :ticketComment",{ticketComment: ticketComment})
        .getRawOne();

    if(checkForDuplicate?.count > 0){
        return res.status(409).send();
    }
    
    const lastIndex = await getRepository(Ticket)
        .createQueryBuilder("ticket")
        .leftJoin("ticket.board", "board")
        .where("board.id=:boardId", { boardId: board?.id })
        .getCount();

    const ticket = new Ticket();
    ticket.description = "Error: From App";
    ticket.comment = ticketComment;
    ticket.index = lastIndex;
    board?.tickets.push(ticket);
    await board?.save();

    res.status(200).send();
});

export { errorTrackerRouter };
