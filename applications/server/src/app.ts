import express from "express";
import dotenv from "dotenv";
import { createConnection } from "typeorm";

import {connectionConfig} from "./utils/connectionConfig";

import { exampleRouter } from "./routes/exampleRoute";

dotenv.config();
createConnection(connectionConfig);
const app = express();

app.use(exampleRouter);


app.get("/",(req,res)=>{
    return res.send("Test from server");
})

app.listen(process.env.PORT||"8080",()=>{
    console.log(`Server running at http://localhost:${process.env.PORT||"8080"}/`);
})