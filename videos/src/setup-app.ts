import express, { Express } from "express";
import videoRoutes from "./routes/video.routes";
import testingRoutes from "./routes/testing.routes";

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  app.use("/videos", videoRoutes);

  app.use("/testing", testingRoutes);

  return app;
};
