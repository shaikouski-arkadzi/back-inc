import { Request, Response } from "express";
import { UpdateVideoInputDto, Resolution, RESOLUTIONS } from "../types";
import { isValidISODate } from "../utils";
import { videos } from "../db/db";

export const updateVideo = (req: Request, res: Response) => {
  const video = req.body as UpdateVideoInputDto;

  const { id } = req.params;

  if (!video?.title) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Поле обязательное",
          field: "title",
        },
      ],
    });
  }

  if (typeof video.title !== "string") {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Неправильный формат. Должен быть строкой",
          field: "title",
        },
      ],
    });
  }

  if (video.title.length > 40) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Длина поля должна быть не больше 40 символов",
          field: "title",
        },
      ],
    });
  }

  if (!video.author) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Поле обязательное",
          field: "author",
        },
      ],
    });
  }

  if (typeof video.author !== "string") {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Неправильный формат. Должен быть строкой",
          field: "author",
        },
      ],
    });
  }

  if (video.author.length > 20) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Длина поля должна быть не больше 20 символов",
          field: "author",
        },
      ],
    });
  }

  if (!video.availableResolutions) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Поле обязательное",
          field: "availableResolutions",
        },
      ],
    });
  }

  if (!Array.isArray(video.availableResolutions)) {
    return res.status(400).json({
      errorsMessages: [
        {
          message:
            "Неправильный формат availableResolutions. Должен быть массивом",
          field: "availableResolutions",
        },
      ],
    });
  }

  const isValidResolutions =
    Array.isArray(video.availableResolutions) &&
    video.availableResolutions.every((res) =>
      RESOLUTIONS.includes(res as Resolution),
    );

  if (!isValidResolutions) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Некорректное разрешение",
          field: "availableResolutions",
        },
      ],
    });
  }

  if (typeof video.canBeDownloaded !== "boolean") {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Неправильный формат. Должен быть boolean",
          field: "canBeDownloaded",
        },
      ],
    });
  }

  if (!video.canBeDownloaded) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Поле обязательное",
          field: "canBeDownloaded",
        },
      ],
    });
  }

  if (
    typeof video.minAgeRestriction !== "number" &&
    video.minAgeRestriction !== null
  ) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Неправильный формат. Должен быть числом или null",
          field: "minAgeRestriction",
        },
      ],
    });
  }

  if (video.minAgeRestriction! < 1 || video.minAgeRestriction! > 18) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Поле должно быть или null, или в диапазоне от 1 до 18",
          field: "minAgeRestriction",
        },
      ],
    });
  }

  if (!video.publicationDate) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Поле обязательное",
          field: "publicationDate",
        },
      ],
    });
  }

  if (typeof video.publicationDate !== "string") {
    return res.status(400).json({
      errorsMessages: [
        {
          message:
            "Неправильный формат. Должен быть датой ISO в строковом формате",
          field: "publicationDate",
        },
      ],
    });
  }

  if (!isValidISODate(video.publicationDate)) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: "Некорректная ISO строка",
          field: "publicationDate",
        },
      ],
    });
  }

  const videoIndex = videos.findIndex((v) => v.id === Number(id));

  const publicationDate = new Date(video.publicationDate);
  const createdAt = new Date(videos[videoIndex].createdAt);

  const oneDay = 24 * 60 * 60 * 1000;

  if (publicationDate.getTime() < createdAt.getTime() + oneDay) {
    return res.status(400).json({
      errorsMessages: [
        {
          message:
            "Переданный publicationDate меньше чем createdAt плюс один день",
          field: "publicationDate",
        },
      ],
    });
  }

  videos[videoIndex] = {
    ...videos[videoIndex],
    ...video,
  };

  res.sendStatus(204);
};
