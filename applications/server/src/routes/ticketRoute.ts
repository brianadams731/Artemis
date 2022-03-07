import express from "express";
import { getRepository } from "typeorm";
import { Ticket } from "../models/Ticket";

const ticketRoute = express.Router();

ticketRoute.post("/add-ticket/:workspaceId",(req,res)=>{
    const ticket = new Ticket();
    ticket.description = req.body.description;
    ticket.comment = req.body.comment;
    ticket.save();

    return res.status(201).send(ticket.description);
})

ticketRoute.get("/get-all-tickets-debug",async(req,res)=>{
    const query = await getRepository(Ticket).createQueryBuilder("ticket")
    .select(["ticket.description", "ticket.comment"])
    .getMany()

    return res.status(200).json(query);
})

export { ticketRoute };