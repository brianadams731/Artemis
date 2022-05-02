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

    test('Register', async () => {
        let res = await request(app).post("/register").send({
            email:"test@test.com",
            password: "test",
            username: "testUser"
        });
        expect([200,400]).toContain(res.status);
    });
});