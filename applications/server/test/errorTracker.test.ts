import request from "supertest";
import { Connection, createConnection } from "typeorm";
import {app} from '../src/server';
import connectionConfig from "../src/utils/connectionConfig";

import dotenv from "dotenv";

describe('Ticket Functionality', () => {
    let connection: Connection;

    beforeAll(async ()=>{
        dotenv.config();
        connection = await createConnection(connectionConfig);
    })

    afterAll(async ()=>{
        await connection.close();
    })

    test('Trap Error', async () => {
        let res = await request(app).post("/errorTracker").send({
            message:"test message",
            stacktrace: "stacktrace",
            workspaceId: "793795a6-ab6d-4115-9a9a-3ad7112bce31", // TODO: DONT HARD CODE THIS
            client: "test",
            location: "test client",
        });        
        expect([200,409]).toContain(res.status);
    });
});