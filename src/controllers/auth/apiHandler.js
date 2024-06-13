import express from "express"
const router = express.Router()

import register from "./register.js";

router.use("/register",register);

export default router;