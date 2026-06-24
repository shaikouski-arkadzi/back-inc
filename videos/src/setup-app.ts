import express, { Express } from "express";
import videoRoutes from "./routes/video.routes";

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  app.use("/videos", videoRoutes);

  return app;
};
