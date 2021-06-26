import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import IUser from "../types/user.type";
import { CustomError } from "./error.middleware";

const routesToExclude = ["/user/signin", "/user/signup", "/test"];

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (routesToExclude.includes(req.originalUrl)) {
      next();
    } else {
      if (req.headers.authorization) {
        const user: IUser | null = await User.findOne({
          token: req.headers.authorization.replace("Bearer ", ""),
        });

        if (!user) {
          throw new CustomError("Unauthorized", 401);
        } else {
          req.body.user = { token: user.token };
          next();
        }
      } else {
        throw new CustomError("Unauthorized", 401);
      }
    }
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;
