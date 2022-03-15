import express from "express";
import { getRepository } from "typeorm";
import { Board } from "../models/Board";

const boardRouter = express.Router();

boardRouter.get("/get-all-debug", async(req, res) => {
    const query = await getRepository(Board).createQueryBuilder("board")
    .select(["board.name"])
    .getMany()

    return res.status(200).json(query);
});

boardRouter.get("/search/byDescription/:name",async(req,res)=>{
    const name = req.params.name;
    const query = await getRepository(Board).createQueryBuilder("board")
    .select(["board.name"])
    .where("board.name like :name", { name:`%${name}%` })
    .getMany()

    return res.status(200).json(query);
})

export { boardRouter };