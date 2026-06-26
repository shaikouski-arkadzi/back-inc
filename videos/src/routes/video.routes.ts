import { Router } from "express";
import { createVideo, getVideos } from "../controllers";

const router = Router();

router.post("/", createVideo);
router.get("/", getVideos);

export default router;
