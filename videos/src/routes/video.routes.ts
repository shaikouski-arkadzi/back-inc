import { Router } from "express";
import { createVideo } from "../controllers";

const router = Router();

router.post("/", createVideo);

export default router;
