require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');
const app = require('../server');

describe('Post Endpoints', () => {
    it('should signin', async () => {
        const res = await request(app)
            .post('/auth/signin')
            .send({
                username: 'agata',
                password: '123',
            });
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('post')
    })
})
