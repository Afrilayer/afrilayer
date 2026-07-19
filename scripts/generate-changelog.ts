import { exec } from 'child_process';
import { promisify } from 'util';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '..');

interface GitCommit {
  hash: string;
  date: string;
  message: string;
  author: string;
}

const COMMIT_LIMIT = 100;

async function generateChangelog() {
  let commits: GitCommit[] = [];
  try {
    const { stdout } = await execAsync(
      `git log --pretty=format:"%H|%ad|%s|%an" --date=iso -n ${COMMIT_LIMIT}`,
      { cwd: baseDir }
    );
    commits = stdout
      .split('\n')
      .filter(Boolean)
      .map((line): GitCommit | null => {
        const [hash, date, message, author] = line.split('|');
        if (!hash || !date || !message || !author) return null;
        return { hash: hash.substring(0, 7), date, message, author };
      })
      .filter((c): c is GitCommit => c !== null);
    console.log(`[generate-changelog] Captured ${commits.length} commits from git log.`);
  } catch (err) {
    console.warn('[generate-changelog] Could not read git history at build time.');
    console.warn(err instanceof Error ? err.message : err);
  }

  const outputPath = path.join(baseDir, 'public', 'changelog-data.json');
  const payload = { generatedAt: new Date().toISOString(), commits };
  await fs.writeFile(outputPath, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`[generate-changelog] Wrote ${outputPath}`);
}

generateChangelog().catch((err) => {
  console.error('[generate-changelog] Failed:', err);
  process.exit(0);
});