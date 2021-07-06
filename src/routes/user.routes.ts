import { Router } from "express";
import user from "../controllers/user.controllers";

const router: Router = Router();

router.post("/signup", user.signup);

router.post("/signin", user.signin);

router.get("/account", user.account);

export default router;
