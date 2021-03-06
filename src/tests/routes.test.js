require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');
const createApp = require('../server');
const db = require("../models");

beforeAll((done) => {
    db.connect(() => done())
})

afterAll((done) => {
    db.sequelize.close().then(() => done());
})

const app = createApp();

describe('Post Endpoints', () => {
    it('should signin', async () => {
        const res = await request(app)
            .post('/auth/signin')
            .send({
                username: 'agata',
                password: '123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('accessToken');
    });
});

describe('Post Endpoints', () => {
    it('should signup', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({
                username: 'unique',
                email: 'unique@gmail.com',
                password: '12345678',
                agreed: true
            });
        expect(res.statusCode).toEqual(200);
    });
})
