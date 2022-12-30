import express from "express";
import { login } from "../controller/user.js";
import register from "../controller/user.js"

const router = express.Router();

router.post("/register", register);
router.post("/login",login);


export default router;