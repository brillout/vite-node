import { join } from "path";
import { spawn, ChildProcess } from "child_process";
import * as WebSocket from "ws";

export { execVite as exec };

let entry: string;
async function execVite(_entry: string) {
  entry = _entry;
  start();
  listen();
}

var proc: ChildProcess;
function start() {
  const cwd = process.cwd();
  const entryPath = join(cwd, entry);
  proc = spawn("node", [join(__dirname, "./child"), entryPath], {
    cwd,
    detached: false,
    stdio: "inherit",
  });
}
function kill() {
  proc.kill();
}

function listen() {
  setTimeout(() => {
    const ws = new WebSocket("ws://localhost:24678");
    ws.on("open", function open() {
      ws.send("something");
    });

    ws.on("message", function incoming(data) {
      console.log("d", data);
      kill();
      start();
    });
  }, 3 * 1000);
}
