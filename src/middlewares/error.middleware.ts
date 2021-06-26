import { Application, Request, Response, NextFunction } from "express";
import { response } from "../utils/functions";

const errorNames: string[] = [];

export class CustomError extends Error {
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = this.constructor.name;
    Object.defineProperty(this, "statusCode", { value: statusCode });
  }
}

const errorMiddleware = (app: Application) => {
  app.use("*", (req: Request, res: Response) => {
    res.status(404).json(response(false, "not found", null));
  });

  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error.name === "CustomError") {
      res.status(error.statusCode).send(response(false, error.message, null));
    } else if (error.name === "MongoError" && error.code === 11000) {
      const key = Object.entries(error.keyValue)[0][0];
      res.status(409).send(response(false, `${key} already exists`, null));
    } else {
      res
        .status(400)
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
