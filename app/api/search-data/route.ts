import { NextResponse } from 'next/server';
import { getAllApis } from '@/lib/data';

export async function GET() {
  const apis = await getAllApis();
  return NextResponse.json({ apis });
}

export const dynamic = 'force-static';
export const revalidate = 3600;