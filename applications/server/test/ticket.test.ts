const request = require("supertest");
import {app} from '../src/server';

describe('Ticket Functionality', () => {
    test('GET', (done) => {
        request(app)
        .get("/")
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
    
    test('POST', (done) => {
        request(app)
        .post('/byId/8e16f889-a18d-445f-98f4-b8af99ca726f')
        .send({ 
            comment: 'test', 
            description: 'test',
        })
        .expect(201)
        .expect((res: { body: { comment: string; description: string; }; }) => {
            res.body.comment = 'test';
            res.body.description = 'test';
        })
        .end((err: any, res :any) => {
            if (err) return done(err);
            return done();
        });
    });

    test('PUT',  (done) => {
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

    test('DELETE', (done) => {
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