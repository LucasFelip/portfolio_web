import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'src', 'data');
const outFile = join(outDir, 'changelog.generated.json');

function run() {
  let entries = [];
  try {
    const raw = execFileSync(
      'git',
      ['-c', 'safe.directory=*', 'log', '-5', '--format=%h%n%ad%n%s', '--date=short'],
      { encoding: 'utf-8' }
    );
    const lines = raw.trim().split('\n');
    for (let i = 0; i < lines.length; i += 3) {
      const [hash, date, message] = lines.slice(i, i + 3);
      if (hash) entries.push({ hash, date, message });
    }
  } catch {
    entries = [];
  }

  let commitCount = null;
  try {
    const count = Number(execFileSync('git', ['-c', 'safe.directory=*', 'rev-list', '--count', 'HEAD'], { encoding: 'utf-8' }).trim());
    commitCount = Number.isFinite(count) && count > 0 ? count : null;
  } catch {
    commitCount = null;
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, JSON.stringify({ lastUpdated: entries[0]?.date ?? null, commitCount, entries }, null, 2));
}

run();
