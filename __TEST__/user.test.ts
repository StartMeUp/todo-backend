import request from "supertest";
import app from "../src/app";
import {
  mongooseConnect,
  mongooseClose,
  dropAllCollections,
} from "../src/utils/database";
import Model from "../src/models";

import { response as res } from "../src/utils/functions";

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

describe("Testing user signup", () => {
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

describe("Testing user signin", () => {
  it("should throw a 400 error and send proper response if req data is incorrect", async () => {
    let response: any;
    try {
      response = await request(app)
        .get("/user/signin")
        .send({ email: "johnemail", password: undefined });
    } catch (error) {
      expect(error.message).toBe(
        "Request Schema error at /user/signin, Issues: email, password"
      );
    }
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Request Schema error at /user/signin, Issues: email, password",
      data: null,
    });
  });

  it("should throw a 401 error and send proper response if email is wrong ", async () => {
    let response: any;
    try {
      response = await request(app)
        .get("/user/signin")
        .send({ email: "john@mail.com", password: "azerty" });
    } catch (error) {
      expect(error.message).toBe("Unauthorized, email doesn't exist");
    }
    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      res(false, "Unauthorized, email doesn't exist", null)
    );
  });

  it("should throw a 401 error and send proper response if password is wrong ", async () => {
    let response: any;
    try {
      response = await request(app)
        .get("/user/signin")
        .send({ email: "john@email.com", password: "azertyazerty" });
    } catch (error) {
      expect(error.message).toBe("Unauthorized, wrong password");
    }
    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      res(false, "Unauthorized, wrong password", null)
    );
  });

  it("should send a 200 status and a proper response with user's token if req data is correct", async () => {
    const user = await Model.User.findOne({ email: johnDoe.email });
    const response = await request(app)
      .get("/user/signin")
      .send({ email: "john@email.com", password: "azerty" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      res(true, "user successfully authenticated", {
        token: `${user ? user.token : "error test user signin"}`,
      })
    );
  });
});

afterAll(async () => {
  await dropAllCollections();
  await mongooseClose();
});
