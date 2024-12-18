import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI!);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("GET /", () => {
    test("should return 'Hello, World!'", async() => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Hello, World!");
    });
    test("should return a proper 404 message", async() => {
        const response = await request(app).get("/random");
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("404 Page not found!");
    });
});