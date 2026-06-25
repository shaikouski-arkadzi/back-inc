import { Request, Response } from "express";
import { CreateVideoInputDto, Resolution, RESOLUTIONS } from "../types";

export const createVideo = (req: Request, res: Response) => {
  const video = req.body as CreateVideoInputDto;

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

  const createdAt = new Date().toISOString();

  const publicationDateDate = new Date(createdAt);
  publicationDateDate.setDate(publicationDateDate.getDate() + 1);

  const publicationDate = publicationDateDate.toISOString();

  const result = {
    ...video,
    id: 0,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: createdAt,
    publicationDate: publicationDate,
  };

  res.status(201).json(result);
};
