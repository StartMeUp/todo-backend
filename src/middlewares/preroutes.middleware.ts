import express, { Application } from "express";
import cors from "cors";
import validate from "../utils/reqValidate";

const preRoutesMiddleware = (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(validate);
  return app;
};

export default preRoutesMiddleware;
