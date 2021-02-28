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

describe('Auth endpoints', () => {
    it('POST signin', async () => {
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

describe('Auth endpoints', () => {
    it('POST signup', async () => {
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

describe('Account endpoints', () => {
    it('GET projects', async () => {
        let res = await request(app)
            .post('/auth/signin')
            .send({
                username: 'agata',
                password: '123'
            });

        expect(res.statusCode).toEqual(200);

        res = await request(app)
            .get('/account/projects')
            .set({'x-access-token': res.body.accessToken})
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.projects).toHaveLength(1);
        expect(res.body.projects[0]).toHaveProperty('id', );
        expect(res.body.projects[0]).toHaveProperty('name');
        expect(res.body.projects[0]).toHaveProperty('description');
    });

    it('POST activation', async () => {
        let res = await request(app)
            .post('/account/active/ACTIVATION')
            .send();

        expect(res.statusCode).toEqual(200);
    });

    it('POST reset', async () => {
        let res = await request(app)
            .post('/account/reset/PASSWORD')
            .send({
                password: 'NewPassword'
            });

        expect(res.statusCode).toEqual(200);
    });
});
