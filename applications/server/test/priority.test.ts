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

    test('Change Priority', async () => {
        const ticketId = "0d190340-a02a-4fb1-8441-858dffa5d9b2";
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