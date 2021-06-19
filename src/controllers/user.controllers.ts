import { Response, Request } from "express";
import { response } from "../utils/functions";
import user from "../services/user.services";

const signup = async (req: Request, res: Response) => {
  const result = await user.signup(req.body);
  res.status(201).json(response(true, "user successfully created", result));
};

export default { signup };
