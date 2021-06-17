import { Application, Request, Response } from "express";
import { response } from "../utils/functions";

const errorNames: string[] = [];

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

const errorMiddleware = (app: Application) => {
  app.use("*", (req: Request, res: Response) => {
    res.status(404).json(response(false, "not found", null));
  });

  app.use((error: any, req: Request, res: Response) => {
    if (error.name === "CustomError") {
      res.status(error.status).send(response(false, error.message, null));
    } else if (error.name === "MongoError" && error.code === 11000) {
      const key = Object.entries(error.keyValue)[0][0];
      res.status(409).send(response(false, `${key} already exists`, null));
    } else {
      res
        .status(error.status)
        .send(
          response(
            false,
            `Error name: ${error.name}, Error message: ${error.message}`,
            null
          )
        );
    }
  });

  return app;
};

export default errorMiddleware;
