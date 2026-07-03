import { Request, Response } from "express";
import {
  APIErrorResult,
  CreateVideoInputDto,
  FieldError,
  Resolution,
  RESOLUTIONS,
  VideoDto,
} from "../types";
import { videos } from "../db/db";

export const createVideo = (
  req: Request<{}, {}, CreateVideoInputDto>,
  res: Response<VideoDto | APIErrorResult>,
) => {
  const video = req.body;

  const messages: FieldError[] = [];

  if (!video?.title) {
    messages.push({
      message: "Поле обязательное",
      field: "title",
    });
  }

  if (typeof video.title !== "string") {
    messages.push({
      message: "Неправильный формат. Должен быть строкой",
      field: "title",
    });
  }

  if (video.title.length > 40) {
    messages.push({
      message: "Длина поля должна быть не больше 40 символов",
      field: "title",
    });
  }

  if (!video.author) {
    messages.push({
      message: "Поле обязательное",
      field: "author",
    });
  }

  if (typeof video.author !== "string") {
    messages.push({
      message: "Неправильный формат. Должен быть строкой",
      field: "author",
    });
  }

  if (video.author.length > 20) {
    messages.push({
      message: "Длина поля должна быть не больше 20 символов",
      field: "author",
    });
  }

  if (!video.availableResolutions) {
    messages.push({
      message: "Поле обязательное",
      field: "availableResolutions",
    });
  }

  if (!Array.isArray(video.availableResolutions)) {
    messages.push({
      message: "Неправильный формат availableResolutions. Должен быть массивом",
      field: "availableResolutions",
    });
  }

  const isValidResolutions =
    Array.isArray(video.availableResolutions) &&
    video.availableResolutions.every((res) =>
      RESOLUTIONS.includes(res as Resolution),
    );

  if (!isValidResolutions) {
    messages.push({
      message: "Некорректное разрешение",
      field: "availableResolutions",
    });
  }

  if (messages.length) {
    return res.status(400).json({
      errorsMessages: messages,
    });
  }

  const createdAt = new Date().toISOString();

  const publicationDateDate = new Date(createdAt);
  publicationDateDate.setDate(publicationDateDate.getDate() + 1);

  const publicationDate = publicationDateDate.toISOString();

  const lastVideo = videos[videos.length - 1];
  const newId = lastVideo ? lastVideo.id + 1 : 0;

  const result: VideoDto = {
    ...video,
    id: newId,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: createdAt,
    publicationDate: publicationDate,
  };

  videos.push(result);

  console.log(videos);

  res.status(201).json(result);
};
