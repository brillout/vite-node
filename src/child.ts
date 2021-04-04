import { createServer, ViteDevServer } from "vite";

export { exec };

async function exec() {
  const entryPath = process.argv[2]
  const cwd = process.cwd();
  const root = cwd;
  const viteDevServer = await getViteDevServer(root);
  await viteDevServer.ssrLoadModule(entryPath);
}

let _viteDevServer: ViteDevServer;
async function getViteDevServer(root: string): Promise<ViteDevServer> {
  if (!_viteDevServer) {
    _viteDevServer = await createServer({
      root,
      server: { middlewareMode: true },
    });
  }
  return _viteDevServer;
}
