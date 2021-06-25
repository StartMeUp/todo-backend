import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import reqSchemas from "../utils/reqSchemas";
import { CustomError } from "../middlewares/error.middleware";

const zodIssues = (issues: [{ path: string[] }]) => {
  let issuesList = "";
  issues.forEach((issue, i) => {
    issuesList += `${issue.path[0]}${issues.length - 1 === i ? "" : ", "}`;
  });
  return issuesList;
};

const routes = Object.keys(reqSchemas);

const preRoutesMiddleware = (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // validate req.body
  app.use((req: Request, res: Response, next: NextFunction) => {
    const path = req.originalUrl;
    if (routes.includes(path)) {
      const ReqSchema = reqSchemas[path];
      try {
        ReqSchema.parse(req.body);
        next();
      } catch (error) {
        console.log(error.issues);
        throw new CustomError(
          `Request Schema error at ${path}, Issues: ${zodIssues(error.issues)}`
        );
      }
    } else {
      next();
    }
  });

  return app;
};

export default preRoutesMiddleware;
