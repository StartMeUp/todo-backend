import { Router } from "express";
import todo from "../controllers/todo.controllers";

const router: Router = Router();

router.get("/", todo.getAll);

router.post("/add", todo.add);

router.patch("/update", todo.update);

router.post("/delete", todo.deleteTodo);

export default router;
