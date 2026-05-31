import express from "express";
import cors from "cors";
import { listProjects } from "./repositories/projects.repository";

const PORT = 3011;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const list = await listProjects();
  res.status(200).json(list);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
