import request from "supertest";
import app from "../src/app";
import {
  mongooseConnect,
  mongooseClose,
  dropAllCollections,
} from "../src/utils/database";

const johnDoe = {
  name: "John",
  surname: "Doe",
  email: "john@email.com",
  password: "azerty",
};

const wrongJohnDoe = {
  name: "John",
  surname: "Doe",
  email: "johnemail",
  password: 12,
};

let newUser: object;

beforeAll(async () => await mongooseConnect());

describe("Testing create user", () => {
  it("should throw an 400 error and send proper response if req data is wrong", async () => {
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

  it("should send a 201 status and a proper response if req data is correct", async () => {
    const response = await request(app).post("/user/signup").send(johnDoe);
    const token: string = response.body.data.token;
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: "user successfully created",
      data: { token },
    });
  });

  it("should throw a 409 error and send proper response if user already exists", async () => {
    let response: any;
    try {
      response = await request(app).post("/user/signup").send(johnDoe);
    } catch (error) {
      expect(error.message).toBe("User already exists");
    }
    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      success: false,
      message: "User already exists",
      data: null,
    });
  });
});

afterAll(async () => {
  await dropAllCollections();
  await mongooseClose();
});
