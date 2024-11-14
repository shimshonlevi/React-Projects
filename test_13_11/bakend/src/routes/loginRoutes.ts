import express, { Router } from "express";
import { handleRegister , handleLogin } from "../controllers/userController";

const router: Router = express.Router();

router.route("/register").post(handleRegister);

router.route("/login").post(handleLogin);

export default router;