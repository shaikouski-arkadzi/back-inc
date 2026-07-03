import { Request, Response } from "express";
import { videos } from "../db/db";

export const getVideo = (
  req: Request<{ id: string }>,
  res: Response<VideoDto | null>,
) => {
  const { id } = req.params;
  const result = videos.find((video) => video.id === Number(id));
  if (result) {
    res.status(200).json(result);
  } else {
    res.sendStatus(404);
  }
};
