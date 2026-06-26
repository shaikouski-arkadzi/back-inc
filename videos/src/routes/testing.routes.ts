import { Router } from "express";
import { deleteAllData } from "../controllers";

const router = Router();

router.delete("/all-data", deleteAllData);

export default router;
