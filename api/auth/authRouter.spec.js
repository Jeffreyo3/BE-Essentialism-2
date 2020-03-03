const server = require("../server");
const request = require("supertest");
const db = require("../../database/dbConfig");


const name = Math.random().toString(36).substring(2, 15)
const pw =  Math.random().toString(36).substring(2, 15)

describe('server.js', () => {
    test('should be the testing environment', () => {
        expect(process.env.DB_ENV).toBe('test');
    });
})


describe('auth-router POST to /register', () => {
    beforeEach(() => {
        db("users").truncate();
    });

    test("register without required data fails with a 400 response", async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({ key: "value" });

        expect(res.status).toBe(400);
    });

    test("registers user successfully with a 201 response", async () => {
        await db.seed.run();
        const res = await request(server)
            .post('/api/auth/register')
            .send({ username: name, password: pw });
            
        expect(res.type).toBe("application/json");
        expect(res.status).toBe(201);
    });
});

describe('auth-router POST to /login', () => {
    beforeEach(() => {
        db("users").truncate();
    });

    test("login user fails with a 401 response when credentials are invalid", async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({username: name, password: `${pw}haha`})

        expect(res.status).toBe(401);
    })

    test("login user successful with a 200 response", async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: name, password: pw });

        expect(res.status).toBe(200);
    });

    test("successful login returns a token", async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: name, password: pw });

        expect(res.body).toHaveProperty("token");
    })
})

