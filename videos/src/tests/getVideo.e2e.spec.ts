import request from "supertest";
import express from "express";
import router from "../routes/video.routes";
import { videos } from "../db/db";

const app = express();

app.use(express.json());
app.use("/videos", router);

describe("GET /videos/:id", () => {
  it("should return video by id", async () => {
    const body = {
      title: "My Video",
      author: "Arkadiy",
      availableResolutions: ["P144"],
    };

    const responseCreate = await request(app)
      .post("/videos")
      .send(body)
      .expect(201);

    const responseGetById = await request(app)
      .get(`/videos/${responseCreate.body.id}`)
      .expect(200);

    expect(responseGetById.body).toEqual(responseCreate.body);
  });

  it("should return 404 if video does not exist", async () => {
    await request(app).get("/videos/999999").expect(404);
  });
});
