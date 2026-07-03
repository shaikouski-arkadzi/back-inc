import { Request, Response } from "express";
import { videos } from "../db/db";

export const deleteVideo = (
  req: Request<{ id: string }>,
  res: Response<null>,
) => {
  const { id } = req.params;

  const index = videos.findIndex((video) => video.id === Number(id));

  if (index === -1) {
    return res.sendStatus(404);
  }

  videos.splice(index, 1);

  return res.sendStatus(204);
};
