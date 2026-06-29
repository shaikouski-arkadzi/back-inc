import { Router } from "express";
import { createVideo, getVideo, getVideos } from "../controllers";

const router = Router();

router.post("/", createVideo);
router.get("/", getVideos);
router.get("/:id", getVideo);

export default router;
