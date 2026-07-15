import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface GitCommit {
  hash: string;
  date: string;
  message: string;
  author: string;
}

export async function GET() {
  try {
    // Get git log with author and date
    const { stdout } = await execAsync('git log --pretty=format:"%H|%ad|%s|%an" --date=iso -n 20', {
      cwd: process.cwd(),
    });
    
    const commits = stdout
      .split('\n')
      .filter(Boolean)
      .map((line): GitCommit | null => {
        const [hash, date, message, author] = line.split('|');
        if (!hash || !date || !message || !author) return null;
        return {
          hash: hash.substring(0, 7),
          date,
          message,
          author,
        };
      })
      .filter((c): c is GitCommit => c !== null);

    return NextResponse.json({ commits });
  } catch (error) {
    // Fallback to static data if git fails
    return NextResponse.json({ commits: [] });
  }
}

export const dynamic = 'force-static';
export const revalidate = 3600;