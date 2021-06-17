// dependencies
import express, { Application, Request, Response, NextFunction } from "express";
import errorMiddleware from "./middlewares/error.middleware";
import preRoutesMiddleware from "./middlewares/preroutes.middleware";

// initialize app and middlewares
const app: Application = express();
preRoutesMiddleware(app);

// routes
app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({ message: "test route", reqBody: req.body });
});

// error management
errorMiddleware(app);

// export to server.ts for supertest to work
export default app;
