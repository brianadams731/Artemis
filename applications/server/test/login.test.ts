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

    test('Login', async () => {
        const res = await request(app).post("/login").send({
            email:"test@test.com",
            password:"test"
        });
        expect(res.status).toEqual(200);

        
    });
});