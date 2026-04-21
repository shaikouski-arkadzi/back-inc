import { createServer } from "http";

const stats = {
  totalRequests: 0,
  routes: {},
};

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 22 },
];

const statService = (url) => {
  if (url !== "/stats") {
    stats.routes[url] = (stats.routes[url] || 0) + 1;
    stats.totalRequests++;
  }
};

const server = createServer((req, res) => {
  console.info(`[${req.method}] ${req.url} at ${new Date()}`);

  statService(req.url);

  if (req.url === "/hello" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from my server!");
  } else if (req.url === "/time" && req.method === "GET") {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Current time is: ${hours}:${minutes}`);
  } else if (req.url === "/about" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("My name is Arkadiy, I study Back-end.");
  } else if (req.url.startsWith("/users") && req.method === "GET") {
    const [_, path, params] = req.url.split("/");
    if (path === "users") {
      if (params) {
        const findedUser = users.find((user) => user.id === Number(params));
        if (findedUser) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(findedUser));
        } else {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("User not found");
        }
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
      }
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Page not found");
    }
  } else if (req.url === "/stats" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(stats));
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Page not found");
  }
});

server.listen(3010, () =>
  console.log("Сервер запущен на http://localhost:4000"),
);
