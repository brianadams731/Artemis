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

    test('Close Ticket', async () => {
        let res = await request(app).get(`/ticket/close/${ticketId}`).send(); 
        expect(res.status).toEqual(200);

        res = await request(app).get(`/ticket/byId/${ticketId}`).send();      
        expect(res.body?.closeDate).toBeTruthy();
    });

    test('Open Ticket', async () =>{
        let res = await request(app).get(`/ticket/open/${ticketId}`).send(); 
        expect(res.status).toEqual(200);

        res = await request(app).get(`/ticket/byId/${ticketId}`).send();      
        expect(res.body?.closeDate).toBeFalsy();
    })
});