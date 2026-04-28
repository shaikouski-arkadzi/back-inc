const http = require("http");
const fs = require("fs");
const path = require("path");

function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// случайная задержка 1000–2000 мс
function randomDelay() {
  const min = 1000;
  const max = 2000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const server = http.createServer(async (req, res) => {
  try {
    const { url, method } = req;

    if (method === "GET" && (url === "/home" || url === "/about")) {
      const fileName = url === "/home" ? "home.html" : "about.html";
      const filePath = path.join(__dirname, fileName);

      await delay(randomDelay());

      const content = await readFilePromise(filePath);

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(content);
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Not Found");
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Ошибка сервера");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
