import { join } from "path";
import { spawn } from 'child_process'

export { execVite as exec };

async function execVite(entry: string) {
  const cwd = process.cwd();
  const entryPath = join(cwd, entry);
  spawn('node', [join(__dirname, './child'), entryPath], { cwd, detached: true, stdio: 'inherit' })
}
