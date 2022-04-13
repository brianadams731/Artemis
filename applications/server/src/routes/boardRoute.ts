import express from "express";
import { getRepository } from "typeorm";
import { requireWithUserAsync } from "../middleware/requireWithUserAsync";
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

boardRouter.post("/add", async (req, res)=>{
    interface BoardRequest{
        name: string;
    }
    const board = new Board();
    board.name = req.body.name;
    await board.save();

    return res.status(201).json(board);
})

boardRouter.get("/get-all-debug", async (req, res) => {
    const query = await getRepository(Board).createQueryBuilder("board")
    .leftJoinAndSelect("board.tickets","ticket")
    .getMany();

    return res.status(200).json(query);
});


boardRouter.put("/:boardId", requireWithUserAsync, async (req, res) => {
    const boardId = req.params.boardId;

    if (!boardId) {
        return res.status(500).send("Error: Board id invalid");
    }
    
    const board = await Board.findOne(boardId);
    board.name = req.body.name;
    await board?.save();

    return res.status(200).send("Board updated");
});


boardRouter.delete("/:boardId", requireWithUserAsync, async (req, res) => {
    // TODO: Test route
    const boardId = req.params.boardId;
    if(!boardId) {
        return res.status(500).send("Error: Board id invalid");
    }
    const board = await Board.findOne(boardId);

    const didDelete = await board?.remove();
    if(!didDelete){
        res.status(500).send("Error: Board failed to remove");
    }
    return res.status(200).send("Board removed");
});

export { boardRouter };