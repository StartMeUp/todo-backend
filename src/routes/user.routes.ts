import { Router } from "express";
import user from "../controllers/user.controllers";

const router: Router = Router();

router.post("/signup", user.signup);

export default router;
