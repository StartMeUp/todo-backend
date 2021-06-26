import { Router } from "express";
import user from "../controllers/user.controllers";

const router: Router = Router();

router.post("/signup", user.signup);

router.get("/signin", user.signin);

export default router;
