import request from "supertest";
import express from "express";
import router from "../routes/video.routes";
import { videos } from "../db/db";

const app = express();

app.use(express.json());
app.use("/videos", router);

describe("GET /videos", () => {
  it("should return 200 and all videos", async () => {
    const response = await request(app).get("/videos").expect(200);

    expect(response.body).toEqual(videos);
  });
});
