import express from "express";
import { createQueryBuilder, getManager, getRepository } from "typeorm";
import { requireWithUserAsync } from "../middleware/requireWithUserAsync";
import { Workspace } from "../models/Workspace";
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
    const boardId = req.params.boardId;

    const lastIndex = await getRepository(Ticket)
        .createQueryBuilder("ticket")
        .leftJoin("ticket.board", "board")
        .where("board.id=:boardId", { boardId: boardId })
        .getCount();

    const board = await Board.findOne(boardId, {
        relations: ["tickets"],
    });

    const ticket = new Ticket();
    ticket.comment = req.body.comment;
    ticket.description = req.body.description;
    ticket.priority = req.body.priority ? req.body.priority : 0;

    ticket.index = lastIndex;
    board?.tickets.push(ticket);
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

ticketRoute.patch("/byId/:ticketId", requireWithUserAsync, async (req, res) => {
    const ticketId = req.params.ticketId;
    const ticketComment = req.body.ticketComment;
    const ticketDescription = req.body.ticketDescription;
    const ticketPriority = req.body.ticketPriority;
    if (!ticketId) {
        return res.status(500).send("Error: Please include Ticket ID");
    }
    const ticket = await Ticket.findOne(ticketId);
    if (!ticket) {
        return res.status(500).send("Error: No such a ticket ID");
    }
    if (ticketComment || ticketComment === "") {
        ticket.comment = ticketComment;
    }
    if (ticketDescription) {
        ticket.description = ticketDescription;
    }
    if (ticketPriority) {
        ticket.priority = ticketPriority;
    }

    await ticket.save();

    return res.status(200).send("Ticket updated");
});

ticketRoute.delete("/byId/:ticketId", async (req, res) => {
    const ticketId = req.params.ticketId;
    if (!ticketId) {
        return res.status(500).send("Error: Ticket id invalid");
    }
    try {
        const ticket = await getManager().query(
            `
                SELECT board_id, index
                FROM ticket
                WHERE id=$1
            `,
            [ticketId]
        );

        if (!ticket) {
            throw "Ticket Does Not Exist!";
        }
        await getManager().query(
            `
                DELETE FROM ticket
                WHERE id=$1
            `,
            [ticketId]
        );
        await getManager().query(
            `
                UPDATE ticket
                SET index = index - 1
                WHERE board_id=$1 and index > $2
            `,
            [ticket[0].board_id, ticket[0].index]
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error: Ticket failed to remove");
    }
    return res.status(200).send("Ticket removed");
});

ticketRoute.post("/byId/:ticketId", async (req, res) => {
    const ticketId = req.params.ticketId;
    if (!ticketId) {
        return res.status(400).send();
    }

    await createQueryBuilder()
        .update(Ticket)
        .set({ closeDate: () => "NOW()" })
        .where("ticket.id = :searchTicketId", { searchTicketId: ticketId })
        .execute();
    return res.status(200).send();
});

ticketRoute.get("/close/:ticketId", async (req, res) => {
    const ticketId = req.params.ticketId;
    if (!ticketId) {
        return res.status(400).send();
    }
    try {
        await createQueryBuilder()
            .update(Ticket)
            .set({ closeDate: () => "NOW()" })
            .where("id=:ticketId", { ticketId })
            .execute();
    } catch (err) {
        return res.status(500).send();
    }
    return res.status(200).send();
});

ticketRoute.get("/open/:ticketId", async (req, res) => {
    const ticketId = req.params.ticketId;
    if (!ticketId) {
        return res.status(400).send();
    }
    try {
        await createQueryBuilder()
            .update(Ticket)
            .set({ closeDate: null })
            .where("id=:ticketId", { ticketId })
            .execute();
    } catch (err) {
        return res.status(500).send();
    }
    return res.status(200).send();
});

ticketRoute.get("/byId/:ticketId", async (req, res) => {
    const ticketId = req.params.ticketId;
    let ticket: Ticket | undefined;
    try {
        ticket = await Ticket.findOne(ticketId);
    } catch (err) {
        return res.status(500).send();
    }
    if (!ticket) {
        return res.status(400).send();
    }

    return res.status(200).json(ticket);
});

ticketRoute.get("/count/:workspaceId", async (req, res) => {
    console.log(req.params.workspaceId);
    
    const workspace = await getRepository(Workspace).createQueryBuilder("workspace")
    .select(["tickets.closeDate"])
    .leftJoin("workspace.boards","boards")
    .leftJoin("boards.tickets", "tickets")
    .where("workspace.id = :workspaceId",{workspaceId: req.params.workspaceId})
    .getRawMany();

    let nullCount = 0;
    let nonNullCount = 0;

    workspace.forEach((ticket)=>{
        if(ticket.tickets_closeDate === null){
            nullCount++;
        }else{
            nonNullCount++;
        }
    })
    
    return res.status(200).json({
        closed: nonNullCount,
        open: nullCount
    });
    
});

export { ticketRoute };
