import { pool } from "../db.js";

interface IProject {
  id: number;
  name: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  created_at: Date;
}

export async function listProjects(): Promise<IProject[]> {
  const { rows } = await pool.query(`SELECT * FROM projects;`);
  console.log(rows);
  return rows;
}
