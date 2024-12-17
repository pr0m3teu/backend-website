import { Router } from "express";
import { login, logout, refresh } from "../controllers/authController";
import loginLimiter from "../middleware/loginLimiter";

const authRouter = Router();
authRouter.post("/", loginLimiter, login);

authRouter.get("/refresh", refresh);

authRouter.post("/logout", logout);

export default authRouter;