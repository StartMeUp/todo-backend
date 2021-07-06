import express, { Application } from "express";
import cors from "cors";
import validate from "./reqValidate";
import isAuthenticated from "./isAuthenticated";

const preRoutesMiddleware = (app: Application) => {
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(isAuthenticated);
  app.use(validate);
  return app;
};

export default preRoutesMiddleware;
