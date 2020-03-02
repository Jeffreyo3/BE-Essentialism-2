const request = require("supertest");
const server = require('../server')

describe("valueRouter GET at /api/values", () => {

    test("Values can be retrieved without token", async () => {
        let res = await request(server)
            .get('/api/values');

        expect(res.status).toBe(200);
    });

    test("Values GET returns an array containing objects of Values", async () => {
        let res = await request(server)
            .get('/api/values')
        expect(res.body).toEqual(expect.arrayContaining([{ "id": 1, "value": "Athleticism and health" }]))
    })

})