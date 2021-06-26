import { Response, Request, NextFunction } from "express";
import { response } from "../utils/functions";
import user from "../services/user.services";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await user.signup(req.body);
    res.status(201).json(response(true, "user successfully created", result));
  } catch (error) {
    next(error);
  }
};

export default { signup };
