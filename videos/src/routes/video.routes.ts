import { Router } from "express";
import { createVideo, deleteVideo, getVideo, getVideos } from "../controllers";

const router = Router();

router.post("/", createVideo);
router.get("/", getVideos);
router.get("/:id", getVideo);
router.delete("/:id", deleteVideo);

export default router;
