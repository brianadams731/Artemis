import express from "express";
import { getRepository } from "typeorm";
import { requireWithUserAsync } from "../middleware/requireWithUserAsync";
import { Board } from "../models/Board";
import { Ticket } from "../models/Ticket";

const ticketRoute = express.Router();

ticketRoute.get("/search/byDescription/:description", async (req, res) => {
    const description = req.params.description;
    const query = await getRepository(Ticket)
        .createQueryBuilder("ticket")
        .select(["ticket.description", "ticket.comment"])
        .where("LOWER(ticket.description) like LOWER(:desc)", { desc: `%${description}%` })
        .getMany();

    return res.status(200).json(query);
});

ticketRoute.post("/add/byBoardId/:boardId", async (req, res) => {
    interface Request {
        comment: string;
        description: string;
    }
    const boardId = parseInt(req.params.boardId);
    const board = await Board.findOne(boardId, {
        relations: ["tickets"],
    });
    const ticket = new Ticket();
    ticket.comment = req.body.comment;
    ticket.description = req.body.description;
    board?.tickets.push();
    await board?.save();

    return res.status(201).json(board);
});

ticketRoute.get("/get-all-tickets-debug", async (req, res) => {
    const query = await getRepository(Ticket)
        .createQueryBuilder("ticket")
        .select(["ticket.description", "ticket.comment"])
        .getMany();

    return res.status(200).json(query);
});

ticketRoute.delete("/:ticketId", requireWithUserAsync, async (req, res) => {
    // TODO: Test route
    const ticketId = req.params.ticketId;
    if(!ticketId){
        return res.status(500).send("Error: Ticket id invalid");
    }
    const ticket = await Ticket.findOne(ticketId);

    const didDelete = await ticket?.remove();
    if(!didDelete){
        res.status(500).send("Error: Ticket failed to remove");
    }
    return res.status(200).send("Ticket removed");
});

export { ticketRoute };
