import request from "supertest";
import app from "../src/app";
import { mongooseConnect, mongooseClose } from "../src/utils/database";

beforeAll(async () => await mongooseConnect());

afterAll(async () => await mongooseClose());

describe("Testing express server", () => {
  it("server should respond with 200 status an send a text response", async () => {
    const response = await request(app).get("/test");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("test route");
  });
});
