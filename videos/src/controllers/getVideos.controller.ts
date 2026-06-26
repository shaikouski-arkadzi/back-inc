import { Request, Response } from "express";
import { videos } from "../db/db";

export const getVideos = (req: Request, res: Response) => {
  res.status(200).json(videos);
};
