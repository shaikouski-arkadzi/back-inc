import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({ connectionString });
