import request from "supertest";
import { Connection, createConnection } from "typeorm";
import {app} from '../src/server';
import connectionConfig from "../src/utils/connectionConfig";

import dotenv from "dotenv";

describe('Ticket Functionality', () => {
    let connection: Connection;
    let cookies: any;
    beforeAll(async ()=>{
        dotenv.config();
        connection = await createConnection(connectionConfig);

        await request(app).post("/register").send({
            email:"test@test.com",
            password: "test",
            username: "testUser"
        });

        const res = await request(app).post("/login").send({
            email:"test@test.com",
            password:"test"
        });

        cookies = res.header['set-cookie'][0];
    })

    afterAll(async ()=>{
        await connection.close();
    })

    const ticketId = "0348e780-ba17-43e5-99f8-a4ddfba97f68";

    test('Change Priority', async () => {
        const priority = 1;
        let res = await request(app).patch(`/ticket/byId/${ticketId}`).set("Cookie",[`${cookies}`]).send({
            ticketPriority: priority
        }); 

        expect(res.status).toEqual(200);

        res = await request(app).get(`/ticket/byId/${ticketId}`).send();      
        expect(res.body?.priority).toEqual(priority);
    });
});