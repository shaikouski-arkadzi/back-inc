import request from "supertest";
import express from "express";
import router from "../routes/video.routes";
import { videos } from "../db/db";

const app = express();

app.use(express.json());
app.use("/videos", router);

describe("POST /videos", () => {
  it("should create video with valid data", async () => {
    const body = {
      title: "My Video",
      author: "Arkadiy",
      availableResolutions: ["P144"],
    };

    const response = await request(app)
      .post("/videos")
      .send(body)
      .expect(201);

    expect(response.body).toEqual({
      id: 0,
      title: "My Video",
      author: "Arkadiy",
      availableResolutions: ["P144"],
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: expect.any(String),
      publicationDate: expect.any(String),
    });

    expect(videos.length).toBe(1);
  });

  it("should return 400 if title is missing", async () => {
    const body = {
      author: "Arkadiy",
      availableResolutions: ["P144"],
    };

    const response = await request(app)
      .post("/videos")
      .send(body);

    expect(response.statusCode).toEqual(400)

    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "Поле обязательное",
          field: "title",
        },
      ],
    });

    expect(videos.length).toBe(1);
  });

  it("should return 400 if title is not string", async () => {
    const body = {
      title: 1,
      author: "Arkadiy",
      availableResolutions: ["P144"],
    };

    const response = await request(app)
      .post("/videos")
      .send(body);

    expect(response.statusCode).toEqual(400)

    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "Неправильный формат. Должен быть строкой",
          field: "title",
        },
      ],
    });

    expect(videos.length).toBe(1);
  });

  it("should return 400 if title longer than 40 chars", async () => {
    const response = await request(app)
      .post("/videos")
      .send({
        title: "a".repeat(41),
        author: "Arkadiy",
        availableResolutions: ["P144"],
      })
      .expect(400);

    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "Длина поля должна быть не больше 40 символов",
          field: "title",
        },
      ],
    });
  });

  it("should return 400 if author is missing", async () => {
    const body = {
      title: "My video",
      availableResolutions: ["P144"],
    };

    const response = await request(app)
      .post("/videos")
      .send(body);

    expect(response.statusCode).toEqual(400)

    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "Поле обязательное",
          field: "author",
        },
      ],
    });

    expect(videos.length).toBe(1);
  });

  it("should return 400 if author is not string", async () => {
    const body = {
      title: "My video",
      author: 1,
      availableResolutions: ["P144"],
    };

    const response = await request(app)
      .post("/videos")
      .send(body);

    expect(response.statusCode).toEqual(400)

    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "Неправильный формат. Должен быть строкой",
          field: "author",
        },
      ],
    });

    expect(videos.length).toBe(1);
  });

  it("should return 400 if author longer than 20 chars", async () => {
    const response = await request(app)
      .post("/videos")
      .send({
        title: "My video",
        author: "a".repeat(21),
        availableResolutions: ["P144"],
      })
      .expect(400);

    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "Длина поля должна быть не больше 20 символов",
          field: "author",
        },
      ],
    });
  });

  it("should return 400 if availableResolutions is missing", async () => {
    const body = {
      title: "My video",
      author: "Arkadiy",
    };

    const response = await request(app)
      .post("/videos")
      .send(body);

    expect(response.statusCode).toEqual(400)

    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "Поле обязательное",
          field: "availableResolutions",
        },
      ],
    });

    expect(videos.length).toBe(1);
  });

  it("should return 400 if availableResolutions is not array", async () => {
    const body = {
      title: "My video",
      author: "Arkadiy",
      availableResolutions: "P144",
    };

    const response = await request(app)
      .post("/videos")
      .send(body);

    expect(response.statusCode).toEqual(400)

    expect(response.body).toEqual({
      errorsMessages: [
        {
          message:
            "Неправильный формат availableResolutions. Должен быть массивом",
          field: "availableResolutions",
        },
      ],
    });

    expect(videos.length).toBe(1);
  });

  it("should return 400 if availableResolutions is invalid", async () => {
    const body = {
      title: "My video",
      author: "Arkadiy",
      availableResolutions: ["P145"],
    };

    const response = await request(app)
      .post("/videos")
      .send(body);

    expect(response.statusCode).toEqual(400)

    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "Некорректное разрешение",
          field: "availableResolutions",
        },
      ],
    });

    expect(videos.length).toBe(1);
  });

  it("should increment ID", async () => {
    videos.length = 0

    const response1 = await request(app)
      .post("/videos")
      .send({
        title: "Video 1",
        author: "Arkadiy",
        availableResolutions: ["P144"],
      });

    expect(response1.statusCode).toEqual(201)

    const response1Id = response1.body.id;

    const response2 = await request(app)
      .post("/videos")
      .send({
        title: "Video 2",
        author: "Arkadiy",
        availableResolutions: ["P144"],
      });

    expect(response2.statusCode).toEqual(201)

    const response2Id = response2.body.id;

    expect(response1Id + 1).toEqual(response2Id)
  });
});