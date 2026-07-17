// Verification data loader
// Reads providers/verification/verify.txt and returns a map of slug -> verification level

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { VerificationLevel, VerificationInfo } from '../types';

const __filename = fileURLToPath(import.meta.url);
const baseDir = path.resolve(path.dirname(__filename), '../..');

const VERIFICATION_CODES: Record<string, VerificationLevel> = {
  cv: 'community',
  pv: 'provider',
};

const VERIFICATION_MESSAGES: Record<VerificationLevel, string> = {
  community: 'Community Verified — This provider\'s information has been reviewed by the Afrilayer community.',
  provider: 'Provider Verified — This provider has confirmed their information directly.',
};

// Load and parse verify.txt, returning a Map<slug, VerificationLevel>
export async function loadVerificationData(): Promise<Map<string, VerificationLevel>> {
  const verifyPath = path.join(baseDir, 'providers', 'verification', 'verify.txt');

  try {
    const content = await fs.readFile(verifyPath, 'utf-8');
    const map = new Map<string, VerificationLevel>();

    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();

      // Skip empty lines, comments, and the header line
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('Afrilayer')) {
        continue;
      }

      const match = trimmed.match(/^([a-z0-9][a-z0-9-]*)\s*:\s*(cv|pv)$/i);
      if (match) {
        const slug = match[1].toLowerCase();
        const code = match[2].toLowerCase();
        const level = VERIFICATION_CODES[code];
        if (level) {
          map.set(slug, level);
        }
      }
    }

    return map;
  } catch {
    // File doesn't exist or can't be read — return empty map
    return new Map();
  }
}

// Get verification info for a specific slug
export function getVerificationInfo(
  slug: string,
  verificationMap: Map<string, VerificationLevel>
): VerificationInfo | undefined {
  const level = verificationMap.get(slug);
  if (!level) return undefined;

  return {
    verified: true,
    level,
  };
}

// Get the tooltip message for a verification level
export function getVerificationMessage(level: VerificationLevel): string {
  return VERIFICATION_MESSAGES[level];
}

export type { VerificationLevel, VerificationInfo };