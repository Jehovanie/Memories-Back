import express from "express";

import { signing, signup } from "../controllers/user_controller.js";

const router = express.Router();

router.post("/signing", signing);
router.post("/signup", signup);


export default router;