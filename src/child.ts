import { createServer, ViteDevServer } from "vite";

killEverythingOnExit();
exec();

async function exec() {
  console.log(process.pid);
  const entryPath = process.argv[2];
  const cwd = process.cwd();
  const root = cwd;
  const viteDevServer = await getViteDevServer(root);
  await viteDevServer.ssrLoadModule(entryPath);
}

var _viteDevServer: ViteDevServer;
async function getViteDevServer(root: string): Promise<ViteDevServer> {
  if (!_viteDevServer) {
    _viteDevServer = await createServer({
      root,
      server: { middlewareMode: true },
    });
  }
  return _viteDevServer;
}

function killEverythingOnExit() {
  process.on("exit", () => {
    process.kill(-process.pid, "SIGKILL");
  });
}
