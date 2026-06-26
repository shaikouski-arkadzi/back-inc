import { Request, Response } from "express";
import { videos } from "../db/db";

export const deleteAllData = (req: Request, res: Response) => {
  videos.length = 0;
  res.sendStatus(204);
};
