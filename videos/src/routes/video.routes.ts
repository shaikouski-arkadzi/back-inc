import { Router } from "express";
import {
  createVideo,
  deleteVideo,
  getVideo,
  getVideos,
  updateVideo,
} from "../controllers";

const router = Router();

router.post("/", createVideo);
router.get("/", getVideos);
router.get("/:id", getVideo);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

export default router;
