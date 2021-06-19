import request from "supertest";
import app from "../src/app";

const johnDoe = {
  name: "John",
  surname: "Doe",
  email: "john@email.com",
  password: "azerty",
};

describe("Testing create user", () => {
  it("should send a 201 status", async () => {
    const response = await request(app).post("/user/signup").send(johnDoe);
    expect(response.status).toBe(201);
  });

  it("should throw an error if req.body is incorrect", async () => {});
});
