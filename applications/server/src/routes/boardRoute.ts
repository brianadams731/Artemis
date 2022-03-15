import express from "express";
import { getRepository } from "typeorm";
import { Board } from "../models/Board";

const boardRouter = express.Router();

boardRouter.get("/search/byName/:name",async(req,res)=>{
    const name = req.params.name;
    const query = await getRepository(Board).createQueryBuilder("board")
    .where("LOWER(board.name) like LOWER(:name)", { name:`%${name}%` })
    .leftJoinAndSelect("board.tickets","ticket")
    .getMany();

    return res.status(200).json(query);
})

boardRouter.post("/add", async(req,res)=>{
    interface BoardRequest{
        name: string;
    }
    const board = new Board();
    board.name = req.body.name;
    await board.save();

    return res.status(201).json(board);
})

boardRouter.get("/get-all-debug", async(req, res) => {
    const query = await getRepository(Board).createQueryBuilder("board")
    .leftJoinAndSelect("board.tickets","ticket")
    .getMany();

    return res.status(200).json(query);
});

export { boardRouter };