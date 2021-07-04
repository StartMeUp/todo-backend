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
  email: `${process.env.TEST_NEWUSER_EMAIL}`,
  password: "azertyazerty",
};

const wrongJohnDoe = {
  name: "John",
  surname: "Doe",
  email: "johnemail",
  password: 12,
};

beforeAll(async () => await mongooseConnect());

describe("Testing user signup", () => {
  it("should throw an 400 error and send proper response if req data is wrong", async () => {
    let response: any;
    const errorMessage =
      "Request Schema error at /user/signup, Issues: email, password";
    try {
      response = await request(app).post("/user/signup").send(wrongJohnDoe);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
    expect(response.status).toBe(400);
    expect(response.body).toEqual(res(false, errorMessage, null));
  });

  it("should send a 201 status and a proper response if req data is correct", async () => {
    const response = await request(app).post("/user/signup").send(johnDoe);
    const token: string = response.body.data.token;
    const emailNotification: boolean = response.body.data.emailNotification;
    expect(response.status).toBe(201);
    expect(emailNotification).toBe(true);
    expect(response.body).toEqual(
      res(true, "user successfully created", { token, emailNotification })
    );
  });

  it("should throw a 409 error and send proper response if user already exists", async () => {
    let response: any;
    const errorMessage = "User already exists";
    try {
      response = await request(app).post("/user/signup").send(johnDoe);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
    expect(response.status).toBe(409);
    expect(response.body).toEqual(res(false, errorMessage, null));
  });
});

describe("Testing user signin", () => {
  it("should throw a 400 error and send proper response if req data is incorrect", async () => {
    let response: any;
    const errorMessage =
      "Request Schema error at /user/signin, Issues: email, password";
    try {
      response = await request(app)
        .get("/user/signin")
        .send({ email: "johnemail", password: undefined });
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
    expect(response.status).toBe(400);
    expect(response.body).toEqual(res(false, errorMessage, null));
  });

  it("should throw a 401 error and send proper response if email is wrong ", async () => {
    let response: any;
    const errorMessage = "Unauthorized, email doesn't exist";
    try {
      response = await request(app)
        .get("/user/signin")
        .send({ email: "john@mail.com", password: johnDoe.password });
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
    expect(response.status).toBe(401);
    expect(response.body).toEqual(res(false, errorMessage, null));
  });

  it("should throw a 401 error and send proper response if password is wrong ", async () => {
    let response: any;
    const errorMessage = "Unauthorized, wrong password";
    try {
      response = await request(app)
        .get("/user/signin")
        .send({ email: johnDoe.email, password: "azertyazer" });
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
    expect(response.status).toBe(401);
    expect(response.body).toEqual(res(false, errorMessage, null));
  });

  it("should send a 200 status and a proper response with user's token if req data is correct", async () => {
    const user = await Model.User.findOne({ email: johnDoe.email }).lean();
    const response = await request(app)
      .get("/user/signin")
      .send({ email: johnDoe.email, password: johnDoe.password });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      res(true, "user successfully authenticated", { todos: [] })
    );
  });
});

describe("Testing authentication on /user/account", () => {
  it("should throw a 401 error if user in not authenticated", async () => {
    let response: any;
    const errorMessage = "Unauthorized";
    try {
      response = await request(app).get("/user/account");
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
    expect(response.status).toBe(401);
    expect(response.body).toEqual(res(false, errorMessage, null));
  });
});

it("should return the user data if authenticated with bearer token", async () => {
  const user = await Model.User.findOne({ email: johnDoe.email }).lean();
  if (user) {
    user._id = user._id.toString();
    const { hash, salt, ...rest } = user;
    const response = await request(app)
      .get("/user/account")
      .set("Authorization", "Bearer " + user.token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(res(true, "user account details", rest));
  }
});

afterAll(async () => {
  await dropAllCollections();
  await mongooseClose();
});
