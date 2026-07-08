import request from "supertest";
import express from "express";
import router from "../routes/video.routes";
import { videos } from "../db/db";

const app = express();

app.use(express.json());
app.use("/videos", router);

describe("DELETE /videos/:id", () => {
  it("should delete video by id", async () => {
    const body = {
      title: "My Video",
      author: "Arkadiy",
      availableResolutions: ["P144"],
    };

    const responseCreate = await request(app)
      .post("/videos")
      .send(body)
      .expect(201);

    await request(app).delete(`/videos/${responseCreate.body.id}`).expect(204);
  });

  it("should return 404 if video does not exist", async () => {
    await request(app).get("/videos/99999").expect(404);
  });
});
