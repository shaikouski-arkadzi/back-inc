import { pool } from "../db.js";

export type TimeRowDb = {
  id: number;
  saved_at: any;
};

export async function saveCurrentTime(): Promise<TimeRowDb> {
  const result = await pool.query<TimeRowDb>(
    "INSERT INTO times (saved_at) VALUES (NOW()) RETURNING *",
  );
  return result.rows[0]!;
}

export async function getAllTimes(params: {
  from?: string;
  to?: string;
}): Promise<any> {
  const { from, to } = params;

  if (from && to) {
    const result = await pool.query(
      "SELECT * FROM times WHERE saved_at BETWEEN $1 AND $2 ORDER BY saved_at DESC",
      [from, to],
    );
    return result.rows;
  }

  if (from) {
    const result = await pool.query(
      "SELECT * FROM times WHERE saved_at >= $1 ORDER BY saved_at DESC",
      [from],
    );
    return result.rows;
  }

  if (to) {
    const result = await pool.query(
      "SELECT * FROM times WHERE saved_at <= $1 ORDER BY saved_at DESC",
      [to],
    );
    return result.rows;
  }

  const result = await pool.query("SELECT * FROM times ORDER BY saved_at DESC");
  return result.rows;
}

export async function deleteTimeById(id: number) {
  await pool.query("DELETE FROM times WHERE id = $1", [id]);
}

export async function updateTimeById(id: number, newTimestamp: string) {
  const result = await pool.query(
    "UPDATE times SET saved_at=$2 WHERE id=$1 RETURNING *",
    [id, newTimestamp],
  );
  return result.rows[0];
}
