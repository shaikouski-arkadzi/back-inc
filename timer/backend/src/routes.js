import { parse } from "url";
import {
  getAllTimes,
  saveCurrentTime,
  deleteTimeById,
  updateTimeById,
} from "./repositories/timer.repository.js";
import { validateId, validateISODate } from "./utils/index.js";

export async function router(req, res) {
  // Получаем путь (с помощью утилиты parse) и метод из запроса
  const url = parse(req.url || "", true);
  const method = req.method;

  // Обработка запроса: GET /timer
  if (url.pathname === "/timer" && method === "GET") {
    const { from, to } = url.query;
    const times = await getAllTimes(from, to);

    // Говорим клиенту: "Всё ок, вот JSON"
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(times)); // Отправляем массив записей в формате JSON
    return;
  }

  if (url.pathname === "/timer/save" && method === "POST") {
    const time = await saveCurrentTime();
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(time));
    return;
  }

  if (url.pathname?.startsWith("/timer/") && method === "DELETE") {
    const id = url.pathname.split("/")[2];
    await deleteTimeById(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `Deleted time with ID ${id}` }));
    return;
  }

  if (
    url.pathname?.startsWith("/timer/") &&
    method === "PUT" &&
    url.query.saved_at
  ) {
    const id = url.pathname.split("/")[2];
    const dateISO = url.query.saved_at;

    if (!validateId(id)) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid timer ID" }));
      return;
    }

    if (!validateISODate(dateISO)) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid saved_at format" }));
      return;
    }

    const result = await updateTimeById(id, dateISO);

    if (!result) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Record with this ID not found for update" }),
      );
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
}
