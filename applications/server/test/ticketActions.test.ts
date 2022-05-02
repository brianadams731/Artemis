const request = require("supertest");
import {app} from '../src/app';

interface Request {
    comment: string;
    description: string;
}

let ticketId: any;

describe('Ticket Functionality', () => {
    test('GET /search/byDescription/:description', (done) => {
        request(app)
        .get("/search/byDescription/:description")
        .expect(200)
        .expect((res: { body: { comment: string; description: string; }; }) => {
            res.body.comment = 'test';
            res.body.description = 'test';
        })
        .end((err:any, res:any) => {
            if (err) return done(err);
            return done();
        });
    });
    
    test('POST /add/byBoardId/:boardId', (done) => {
        request(app)
        .post('/add/byBoardId/:boardId')
        .send({ 
            comment: 'test', 
            description: 'test',
        })
        .expect(201)
        .expect((res: { body: { comment: string; description: string; }; }) => {
            res.body.comment = 'test';
            res.body.description = 'test';
        })
        .end((err: any, res: { body: { id: any; }; }) => {
            if (err) return done(err);
            ticketId = res.body.id;
            return done();
        });
    });

    test('PUT /byId/:ticketId/:priorityTicket',  (done) => {
        request(app)
        .put('/byId/:ticketId/:priorityTicket')
        .send({ 
            comment: 'test2',
            description: 'test2',
        })
        .expect(200)
        .expect((res: { body: { comment: string; description: string; }; }) => {
            res.body.comment = "test2";
            res.body.description = "test2";
        })
        .end((err:any, res:any) => {
            if (err) return done(err);
            return done();
        });
    });

    test('DELETE /byId/:ticketId', (done) => {
        request(app)
        .put('/byId/:ticketId')
        .send({ 
            comment: 'test2',
            description: 'test2',
        })
        .expect(200)
        .expect((res: { body: { comment: string; description: string; }; }) => {
            res.body.comment = "test2";
            res.body.description = "test2";
        })
        .end((err:any, res:any) => {
            if (err) return done(err);
            return done();
        });
    });
});