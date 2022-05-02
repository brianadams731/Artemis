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

    const ticketId = "8f34ed43-4af5-4c92-8ee9-fa3c5c831788";

    test('Change Priority', async () => {
        const priority = 1;
        let res = await request(app).post(`/ticket/byId/${ticketId}`).send({
            ticketComment:"test",
            ticketDescription:"test-description",
            priority
        }); 

        expect(res.status).toEqual(200);

        res = await request(app).get(`/ticket/byId/${ticketId}`).send();      
        expect(res.body?.priority).toEqual(priority);
    });
});