import { NextResponse, NextRequest } from 'next/server';
import { fetchNewsData, searchNews } from '@/lib/scraper';
import { ApiResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    let news;
    if (query) {
      news = await searchNews(query);
    } else {
      news = await fetchNewsData();
    }

    // Sort by date descending
    news.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

    const response: ApiResponse<any> = {
      success: true,
      data: {
        articles: news,
        count: news.length,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        timestamp: new Date().toISOString(),
        message: 'Failed to fetch news data',
      },
      { status: 500 }
    );
  }
}

export const revalidate = 3600; // Revalidate every hour
// Force rebuild - API key environment variable test
