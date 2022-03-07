import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";

import { Example } from "../models/Example";
import { Board } from "../models/Board";
import { Ticket } from "../models/Ticket";

dotenv.config();
const connectionConfig:ConnectionOptions = {
    type:"postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: true,
    entities:[
        Example,
        Board,
        Ticket,
    ]
}

export { connectionConfig };