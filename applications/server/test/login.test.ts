import request from "supertest";
import { Connection, createConnection } from "typeorm";
import {app} from '../src/server';
import connectionConfig from "../src/utils/connectionConfig";

import dotenv from "dotenv";

describe('Ticket Functionality', () => {
    let cookies: any;
    let connection: Connection;

    beforeAll(async ()=>{
        dotenv.config();
        connection = await createConnection(connectionConfig);

        const res = await request(app).post("/login").send({
            email:"test@test.com",
            password:"test"
        });
        cookies = res.header['set-cookie'][0];
    })

    afterAll(async ()=>{
        await connection.close();
    })

    test('Login', async () => {
        let res = await request(app).post("/login").send({
            email:"test@test.com",
            password:"test"
        });
        expect(res.status).toEqual(200);

        res = await request(app).get("/login/test").set("Cookie",[`${cookies}`]).send();
        expect(res.status).toEqual(200);
    });
});