import { NextResponse } from 'next/server';
import { fetchOutbreakData, calculateOutbreakStats } from '@/lib/scraper';
import { ApiResponse } from '@/lib/types';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    let outbreakData: any;

    // Try to load fresh data from refresh endpoint first
    const dataFilePath = path.join(process.cwd(), 'public', 'outbreak-data.json');
    if (fs.existsSync(dataFilePath)) {
      try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
        outbreakData = JSON.parse(fileContent);
        console.log('✅ Serving real-time outbreak data from refresh cache');
      } catch (fileError) {
        console.error('Error reading cached outbreak data, falling back to scraper:', fileError);
        outbreakData = await getScrapedOutbreakData();
      }
    } else {
      // Fall back to scraper if file doesn't exist
      outbreakData = await getScrapedOutbreakData();
    }

    const response: ApiResponse<any> = {
      success: true,
      data: outbreakData,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Error in outbreak endpoint:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        timestamp: new Date().toISOString(),
        message: 'Failed to fetch outbreak data',
      },
      { status: 500 }
    );
  }
}

/**
 * Fallback: Get data from scraper
 */
async function getScrapedOutbreakData() {
  const outbreaks = await fetchOutbreakData();
  const stats = calculateOutbreakStats(outbreaks);
  return {
    outbreaks,
    stats,
  };
}

export const revalidate = 300; // Revalidate every 5 minutes (faster than cron to catch updates)
