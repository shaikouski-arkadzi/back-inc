import { Request, Response } from "express";
import { videos } from "../db/db";
import { VideoDto } from "../types";

export const getVideos = (req: Request, res: Response<VideoDto[]>) => {
  res.status(200).json(videos);
};
