import { Response, Request, NextFunction } from "express";
import { response } from "../utils/functions";
import todo from "../services/todo.services";

const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await todo.add(req.body);
    res.status(201).json(response(true, "todo successfully created", result));
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await todo.getAll(req.body.user);
    res.status(201).json(response(true, "user's todos", result));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await todo.update(req.body);
    res.status(201).json(response(true, "user's todo updated", result));
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await todo.deleteTodo(req.body);
    res.status(201).json(response(true, "todo successfully deleted", result));
  } catch (error) {
    next(error);
  }
};

export default { add, getAll, update, deleteTodo };
