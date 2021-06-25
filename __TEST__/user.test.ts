import request from "supertest";
import app from "../src/app";

const johnDoe = {
  name: "John",
  surname: "Doe",
  email: "john@email.com",
  password: "azerty",
};

const wrongJohnDoe = {
  name: "John",
  surname: "Doe",
  email: "john@email",
  password: 12,
};

describe("Testing create user", () => {
  it("should send a 201 status and a proper response if req data is correct", async () => {
    const response = await request(app).post("/user/signup").send(johnDoe);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: "user successfully created",
      data: {
        name: "John",
        surname: "Doe",
        email: "john@email.com",
        password: "azerty",
      },
    });
  });

  it("should throw an error, send a 400 status and a proper response if req data is wrong", async () => {
    let response: any;
    try {
      response = await request(app).post("/user/signup").send(wrongJohnDoe);
    } catch (error) {
      expect(error.message).toBe(
        "Request Schema error at /user/signup, Issues: email, password"
      );
    }
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Request Schema error at /user/signup, Issues: email, password",
      data: null,
    });
  });
});
