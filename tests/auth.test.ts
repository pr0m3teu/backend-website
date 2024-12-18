import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

beforeAll(async() => {
    await mongoose.connect(process.env.DB_URI!);
})

afterAll(async() => {
    await mongoose.connection.close();
});

describe('POST /auth', () => {
    it("should return an access token and a cookie refresh token after properly logging in", async() => {
        const user = {
            email: "andrei@gmail.com",
            password: "mihai123"
        }
        const response = await request(app).post("/auth").send(user);
        expect(response.body?.accessToken).toBeDefined();
        expect(response.headers["set-cookie"]).toBeDefined();
        expect(response.statusCode).toBe(200);
    });

    it("should fail logging in", async() =>{
        const response = await request(app).post("/auth").send({ email: "andrei@gmail.com" });
        expect(response.body?.accessToken).toBeUndefined();
        expect(response.statusCode).toBe(400)
    });

    it("should be unauthorized", async() => {
        const user = {
            email: "andrei@gmail.com",
            password: "mihai1230"
        }
        const response = await request(app).post("/auth").send(user);
        expect(response.body?.accessToken).toBeUndefined();
        expect(response.body?.message).toBe("Unauthorized");
        expect(response.statusCode).toBe(401); 
    });
})