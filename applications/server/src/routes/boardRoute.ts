import express from "express";
import { stringify } from "querystring";
import { EntityManager, getManager, getRepository } from "typeorm";
import { requireWithUserAsync } from "../middleware/requireWithUserAsync";
import { Board } from "../models/Board";
import { Ticket } from "../models/Ticket";

const boardRouter = express.Router();

boardRouter.get("/search/byName/:name", async (req, res) => {
    const name = req.params.name;
    const query = await getRepository(Board)
        .createQueryBuilder("board")
        .where("LOWER(board.name) like LOWER(:name)", { name: `%${name}%` })
        .leftJoinAndSelect("board.tickets", "ticket")
        .getMany();

    return res.status(200).json(query);
});

boardRouter.post("/add", async (req, res) => {
    interface BoardRequest {
        name: string;
    }
    const board = new Board();
    board.name = req.body.name;
    await board.save();

    return res.status(201).json(board);
});

boardRouter.get("/get-all-debug", async (req, res) => {
    const query = await getRepository(Board)
        .createQueryBuilder("board")
        .leftJoinAndSelect("board.tickets", "ticket")
        .getMany();

    return res.status(200).json(query);
});

boardRouter.put("/:boardId", requireWithUserAsync, async (req, res) => {
    const boardId = req.params.boardId;

    if (!boardId) {
        return res.status(500).send("Error: Board id invalid");
    }

    const board = await Board.findOne(boardId);
    if (board) {
        board.name = req.body.name;
    }
    await board?.save();

    return res.status(200).send("Board updated");
});

boardRouter.delete("/:boardId", requireWithUserAsync, async (req, res) => {
    // TODO: Test route
    const boardId = req.params.boardId;
    if (!boardId) {
        return res.status(500).send("Error: Board id invalid");
    }
    const board = await Board.findOne(boardId);

    const didDelete = await board?.remove();
    if (!didDelete) {
        res.status(500).send("Error: Board failed to remove");
    }
    return res.status(200).send("Board removed");
});

boardRouter.post("/updateTickets", async (req, res) => {
    interface SourceTicket {
        boardId: string;
        ticketIndex: string;
        ticketId: string;
    }
    interface Target {
        boardId: string;
        ticketIndex: number;
    }
    interface Request {
        source: SourceTicket;
        target: Target;
    }

    if (!req.body.source || !req.body.target) {
        return res.status(500).send("Error: Malformed Request");
    }
    const targetTicket = await Ticket.findOne(req.body.source.ticketId);
    if (!targetTicket || targetTicket.index !== req.body.source.ticketIndex) {
        console.log(`id: ${targetTicket.id}`);
        console.log(`Request: ${req.body.source.ticketIndex}`);
        console.log(`DB: ${targetTicket.index}`);
        return res.status(500).send("Error: Ticket index does not match");
    }
    
    /*
    const source = getRepository(Ticket).createQueryBuilder("ticket")
    .select(["ticket.id","ticket.index"])
    .where("ticket.index")
    */

    await getManager().query(
        `
            UPDATE ticket
            SET index = index - 1
            WHERE board_id=$1 and index > $2
        `,
        [req.body.source.boardId, req.body.source.ticketIndex]
    );

    await getManager().query(
        `
            UPDATE ticket
            SET index = index + 1
            WHERE board_id=$1 and index >= $2
        `,
        [req.body.target.boardId, req.body.target.ticketIndex]
    );

    targetTicket.board = req.body.target.boardId;
    targetTicket.index = req.body.target.ticketIndex;
    await targetTicket.save();

    return res.status(200).send("Updated");
});

export { boardRouter };
