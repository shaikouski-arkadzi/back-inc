import { Request, Response } from "express";
import {
  UpdateVideoInputDto,
  Resolution,
  RESOLUTIONS,
  VideoDto,
  APIErrorResult,
  FieldError,
} from "../types";
import { videos } from "../db/db";
import { isValidISODate } from "../utils";

export const updateVideo = (
  req: Request<{ id: string }, {}, UpdateVideoInputDto>,
  res: Response<APIErrorResult | null>,
) => {
  const video = req.body;

  const { id } = req.params;

  const videoIndex = videos.findIndex((v) => v.id === Number(id));

  if (videoIndex === -1) {
    return res.sendStatus(404);
  }

  const messages: FieldError[] = [];

  if (typeof video?.title !== "string") {
    messages.push({
      message: "Неправильный формат. Должен быть строкой",
      field: "title",
    });
  } else {
    if (video.title.length === 0) {
      messages.push({
        message: "Поле обязательное",
        field: "title",
      });
    }

    if (video.title.length > 40) {
      messages.push({
        message: "Длина поля должна быть не больше 40 символов",
        field: "title",
      });
    }
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

  if (typeof video.canBeDownloaded !== "boolean") {
    messages.push({
      message: "Неправильный формат. Должен быть boolean",
      field: "canBeDownloaded",
    });
  }

  if (!video.canBeDownloaded) {
    messages.push({
      message: "Поле обязательное",
      field: "canBeDownloaded",
    });
  }

  if (
    typeof video.minAgeRestriction !== "number" &&
    video.minAgeRestriction !== null
  ) {
    messages.push({
      message: "Неправильный формат. Должен быть числом или null",
      field: "minAgeRestriction",
    });
  }

  if (video.minAgeRestriction! < 1 || video.minAgeRestriction! > 18) {
    messages.push({
      message: "Поле должно быть или null, или в диапазоне от 1 до 18",
      field: "minAgeRestriction",
    });
  }

  if (typeof video.publicationDate !== "string") {
    messages.push({
      message: "Неправильный формат. Должен быть датой ISO в строковом формате",
      field: "publicationDate",
    });
  } else {
    if (!video.publicationDate) {
      messages.push({
        message: "Поле обязательное",
        field: "publicationDate",
      });
    }

    if (!isValidISODate(video.publicationDate)) {
      messages.push({
        message: "Некорректная ISO строка",
        field: "publicationDate",
      });
    }

    const publicationDate = new Date(video.publicationDate);
    const createdAt = new Date(videos[videoIndex].createdAt);

    const oneDay = 24 * 60 * 60 * 1000;

    if (publicationDate.getTime() < createdAt.getTime() + oneDay) {
      messages.push({
        message:
          "Переданный publicationDate меньше чем createdAt плюс один день",
        field: "publicationDate",
      });
    }
  }

  if (messages.length) {
    return res.status(400).json({
      errorsMessages: messages,
    });
  }

  videos[videoIndex] = {
    ...videos[videoIndex],
    ...video,
  };

  res.sendStatus(204);
};
