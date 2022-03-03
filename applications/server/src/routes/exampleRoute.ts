import express from "express";
import { Example } from "../models/Example";

const exampleRouter = express.Router();

exampleRouter.get("/examplePost",async (req,res)=>{
    const exampleEntity = new Example();
    exampleEntity.exampleField = "this is an example";
    await exampleEntity.save();
    return res.json(exampleEntity);
})

export { exampleRouter };