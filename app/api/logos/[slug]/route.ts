// API Route for serving local provider logos
// This allows logos in /providers/{slug}/ to be served without being in /public
// Path: /api/logos/{slug}

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// File extensions to check for logos
const LOGO_EXTENSIONS = ['svg', 'png'] as const;

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Sanitize slug to prevent path traversal
  const sanitizedSlug = slug.replace(/[^a-z0-9-]/gi, '').toLowerCase();
  if (!sanitizedSlug) {
    return new NextResponse(null, { status: 400 });
  }
  
  // Try to find logo file
  for (const ext of LOGO_EXTENSIONS) {
    try {
      const logoPath = path.join(process.cwd(), 'providers', sanitizedSlug, `logo.${ext}`);
      const content = await fs.readFile(logoPath);
      
      const contentType = ext === 'svg' ? 'image/svg+xml' : 'image/png';
      return new NextResponse(content, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
      });
    } catch {
      // File doesn't exist, try next extension
      continue;
    }
  }
  
  // No logo found - return 404
  return new NextResponse(null, { status: 404 });
}