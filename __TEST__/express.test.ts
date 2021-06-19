import request from "supertest";
import app from "../src/app";

describe("Testing express server", () => {
  it("server should run, respond with 200 status and send a text response", async () => {
    const response = await request(app).post("/test").send({ key: "value" });
    const expectedRes = { message: "test route", reqBody: { key: "value" } };

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedRes);
  });
});
