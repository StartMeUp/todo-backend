import express, { Application } from "express";
import cors from "cors";

const preRoutesMiddleware = (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  return app;
};

export default preRoutesMiddleware;
