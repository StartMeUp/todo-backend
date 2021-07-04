import { z } from "zod";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "./error.middleware";

const userDoc = z.object({
  _id: z.instanceof(mongoose.Types.ObjectId),
  token: z.string(),
});

interface MetadataObj {
  [key: string]: z.AnyZodObject;
}

const reqSchemas: MetadataObj = {
  "/user/signup": z.object({
    name: z.string().min(1),
    surname: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  }),
  "/user/signin": z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  "/todo": z.object({
    user: userDoc,
  }),
  "/todo/add": z.object({
    todo: z.object({
      title: z.string(),
      description: z.string(),
    }),
    user: userDoc,
  }),
  "/todo/update": z.object({
    todo: z.object({
      _id: z.string(),
      title: z.string().optional(),
      done: z.boolean().optional(),
      description: z.string().optional(),
      owner: z.string(),
    }),
    user: userDoc,
  }),
  "/todo/delete": z.object({
    todo: z.object({ _id: z.string(), owner: z.string() }),
    user: userDoc,
  }),
};

const zodIssues = (issues: [{ path: string[] }]) => {
  let issuesList = "";
  issues.forEach((issue, i) => {
    issuesList += `${issue.path[0]}${issues.length - 1 === i ? "" : ", "}`;
  });
  return issuesList;
};

const routes: string[] = Object.keys(reqSchemas);

const validate = (req: Request, res: Response, next: NextFunction) => {
  const path = req.originalUrl;

  if (routes.includes(path)) {
    const ReqSchema = reqSchemas[path];
    try {
      ReqSchema.parse(req.body);
      next();
    } catch (error) {
      console.log("Zod issue", error.issues);
      next(
        new CustomError(
          `Request Schema error at ${path}, Issues: ${zodIssues(error.issues)}`
        )
      );
    }
  } else {
    next();
  }
};

export default validate;
