const server = require("../server");
const request = require("supertest");
const db = require("../../database/dbConfig");


const name = Math.random().toString(36).substring(2, 15)
const pw = Math.random().toString(36).substring(2, 15)
let token;

////  USER VALUES ////
describe("userDataRouter GET at /:id/values", () => {
    beforeAll(async () => {
        let res = await request(server)
            .post("/api/auth/register")
            .send({ username: name, password: pw });
        token = res.body.token;
    })

    test("GET user values fails without auth with status of 401", async () => {
        let res = await request(server)
            .get('/api/user/1/values')

        expect(res.status).toBe(401);
    })

    test("User's values can be retrieved with token with 200 status", async () => {
        let res = await request(server)
            .get('/api/user/1/values')
            .set('Authorization', token);

        expect(res.status).toBe(200);
    })

    test("User_values will return an empty array on the incorrect id", async () => {
        let res = await request(server)
            .get('/api/user/blah/values')
            .set('Authorization', token)
        expect(res.body).toEqual([]);
        expect(res.status).toBe(200);
    })

})

// describe("userDataRouter POST at /:id/values", () => {

//     test("POST user values fails without auth with status of 401", async () => {
//         let res = await request(server)
//             .post('/api/user/1/values')
//             .send({ value_id: 1 })

//         expect(res.status).toBe(401);
//     })

//     test("User values POST will return a 400 if value_id is not included", async () => {
//         let res = await request(server)
//             .post('/api/user/0/values')
//             .set('Authorization', token)
//             .send({})

//         expect(res.status).toBe(400);
//     })

//     test("User values will return a 500 if unique data is already in database", async () => {
//         let res = await request(server)
//             .post('/api/user/1/values')
//             .set('Authorization', token)
//             .send({ value_id: 1 })

//         expect(res.status).toBe(500);
//     })

    test("User values will return a 201 to successfully insert to user_values", async () => {
        let res = await request(server)
            .post('/api/user/0/values')
            .set('Authorization', token)
            .send({ value_id: 1 })

        expect(res.status).toBe(201);
    })

})

describe("userDataRouter PUT at /:id/values", () => {

    test("PUT user values fails without auth with status of 401", async () => {
        let res = await request(server)
            .put('/api/user/1/values')
            .send({ value_id: 1, important: true })

        expect(res.status).toBe(401);
    })

    test("User values PUT will return a 400 if value_id is not included", async () => {
        let res = await request(server)
            .put('/api/user/0/values')
            .set('Authorization', token)
            .send({})

        expect(res.status).toBe(400);
    })

    test("User values will return a 200 to successfully update user_values", async () => {
        let res = await request(server)
            .put('/api/user/1/values')
            .set('Authorization', token)
            .send({ value_id: 1, comment: "string" })

        expect(res.status).toBe(200);
    })

})

//// USER PROJECTS ////
describe("userDataRouter GET at /:id/projects", () => {

    test("GET user projects fails without auth with status of 401", async () => {
        let res = await request(server)
            .get('/api/user/1/projects')

        expect(res.status).toBe(401);
    })

    test("User project GET will return a 200 on success", async () => {
        let res = await request(server)
            .get('/api/user/1/projects')
            .set('Authorization', token)

        expect(res.status).toBe(200);
    })
})

describe("userDataRouter POST at /:id/projects", () => {

    test("POST user projects fails without auth with status of 401", async () => {
        let res = await request(server)
            .post('/api/user/1/projects')
            .send({ value_id: 1, project: "name" })

        expect(res.status).toBe(401);
    })

    test("User projects POST will return a 400 if value_id is not included", async () => {
        let res = await request(server)
            .post('/api/user/0/projects')
            .set('Authorization', token)
            .send({ project: "name" })

        expect(res.status).toBe(400);
    })

    test("User projects POST will return a 400 if project name is not included", async () => {
        let res = await request(server)
            .post('/api/user/0/projects')
            .set('Authorization', token)
            .send({ value_id: 1 })

        expect(res.status).toBe(400);
    })

    test("User projects will return a 201 to successfully insert to projects", async () => {
        let res = await request(server)
            .post('/api/user/0/projects')
            .set('Authorization', token)
            .send({ value_id: 1, project: "name" })

        expect(res.status).toBe(201);
    })
})

describe("userDataRouter PUT at /:id/projects/:project_id", () => {

    test("PUT user projects fails without auth with status of 401", async () => {
        let res = await request(server)
            .put('/api/user/1/projects/1')
            .send({ value_id: 1, project: "name", notes: "string1", completed: true })

        expect(res.status).toBe(401);
    })

    test("User projects POST will return a 400 if value_id is not included", async () => {
        let res = await request(server)
            .put('/api/user/1/projects/1')
            .set('Authorization', token)
            .send({ project: "name" })

        expect(res.status).toBe(400);
    })

    test("User projects POST will return a 400 if project name is not included", async () => {
        let res = await request(server)
            .put('/api/user/1/projects/1')
            .set('Authorization', token)
            .send({ value_id: 1 })

        expect(res.status).toBe(400);
    })

    test("User projects will return a 201 to successfully update to projects", async () => {
        let res = await request(server)
            .put('/api/user/1/projects/1')
            .set('Authorization', token)
            .send({ value_id: 1, project: "name", notes: "string2" })

        expect(res.status).toBe(200);
    })
})

describe("userDataRouter DELETE at /projects/:project_id", () => {

    test("DELETE user projects fails without auth with status of 401", async () => {
        let res = await request(server)
            .delete('/api/user/projects/1')

        expect(res.status).toBe(401);
    })

    test("User projects DELETE will return a 202 if successful", async () => {
        let res = await request(server)
            .delete('/api/user/projects/1')
            .set('Authorization', token)
            .send({ project: "name" })

        expect(res.status).toBe(202);
    })

})