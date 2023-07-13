const request = require('supertest');
const app = require('../server');
const pool = require('./testpool');

describe('API Endpoint Tests', () => {
    beforeAll((done) => {
        pool.connect((err) => {
            done();
        });
    });
    it('should return "Hello, World!" for GET /api/hello', async () => {
        const response = await request(app).get('/api/hello');
        expect(response.statusCode).toBe(200);
    });

    it('should return a failure message for POST /login', async () => {
        const response = await request(app)
            .post('/login')
            .send({ nid: '0' });
        expect(response.statusCode).toBe(400);
    });

    it('should return a success message for POST /register', async () => {
        const formData = {
            name: 'John et Doe',
            address: '123 Main St',
            nid: '0',
        };
        const response = await request(app)
            .post('/register')
            .send(formData);
        expect(response.status).toBe(200);
    });

    it('should return a success message for POST /login', async () => {
        const response = await request(app)
            .post('/login')
            .send({ nid: '0' });
        expect(response.statusCode).toBe(200);
    });

    afterAll((done) => {
        const query = `
        DELETE FROM "User" WHERE nid = '0';
        `;
        client.query(query, (err) => {
            if (err) {
                console.log(err);
            }
            done();
            global.client.release(); // Release the database connection after all tests
        });
    });
});