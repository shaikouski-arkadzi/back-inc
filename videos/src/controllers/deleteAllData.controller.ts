import { Request, Response } from "express";
import { videos } from "../db/db";

export const deleteAllData = (_: Request, res: Response<null>) => {
  videos.length = 0;
  res.sendStatus(204);
};
