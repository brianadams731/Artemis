import express from "express";
import dotenv from "dotenv";
import { createConnection } from "typeorm";

import {connectionConfig} from "./utils/connectionConfig";

import { ticketRoute } from "./routes/ticketRoute"

dotenv.config();
createConnection(connectionConfig);
const app = express();

app.use(express.json());

app.use(ticketRoute);

app.get("/",(req,res)=>{
    return res.send("Test from server");
})

app.listen(process.env.PORT||"8080",()=>{
    console.log(`Server running at http://localhost:${process.env.PORT||"8080"}/`);
})