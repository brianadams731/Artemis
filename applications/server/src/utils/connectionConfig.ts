import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";

import { Example } from "../models/Example";

dotenv.config();
const connectionConfig:ConnectionOptions = {
    type:"postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: true,
    entities:[
        Example
    ]
}

export { connectionConfig };