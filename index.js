import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  // 接続状態を回復のためのオプションを追加・
  // 部屋の修復や見逃したイベントを送信するためのもの
  connectionStateRecovery: {},
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

//
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);

    // 全員にイベントを送信するためのメソッド
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
