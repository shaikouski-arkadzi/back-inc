import express, { Request, Response } from "express";
import cors from "cors";
import {
  getAllTimes,
  saveCurrentTime,
  deleteTimeById,
  updateTimeById,
} from "./repositories/timer.repository.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

// мидлвары
app.use(express.json()); // парсим JSON-тело

// Разрешить для все делать запросы с любых доменов (подходит для локалки)
app.use(cors());

app.get("/timer", async (req: Request, res: Response) => {
  const { from, to } = req.query as { from?: string; to?: string };

  const rows = await getAllTimes({
    ...(from !== undefined && { from }),
    ...(to !== undefined && { to }),
  });
  res.status(200).json(rows);
});

app.post("/timer/save", async (_req: Request, res: Response) => {
  const row = await saveCurrentTime();
  res.status(201).json(row);
});

app.delete("/timer/:id", async (req, res) => {
  await deleteTimeById(Number(req.params.id));
  res.status(200).json({
    message: "The deletion was successful.",
  });
});

app.put("/timer/:id", async (req, res) => {
  const query = req.query as { saved_at?: string };
  const result = await updateTimeById(Number(req.params.id), query.saved_at!);
  res.status(200).json(JSON.stringify(result));
});

app.listen(port, () => console.log(`✅ http://localhost:${port}`));
