import { NextResponse } from 'next/server';
import { fetchOutbreakData, calculateOutbreakStats } from '@/lib/scraper';
import { ApiResponse } from '@/lib/types';

export async function GET() {
  try {
    const outbreaks = await fetchOutbreakData();
    const stats = calculateOutbreakStats(outbreaks);

    const response: ApiResponse<any> = {
      success: true,
      data: {
        outbreaks,
        stats,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching outbreak data:', error);
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

export const revalidate = 300; // Revalidate every 5 minutes for fresh data
