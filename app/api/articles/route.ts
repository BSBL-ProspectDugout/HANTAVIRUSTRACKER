import { NextResponse, NextRequest } from 'next/server';
import { getRecentArticles, getArticlesByCategory } from '@/lib/article-publisher';

/**
 * GET /api/articles
 *
 * Get recently generated articles
 * Query parameters:
 *   - limit: number of articles to return (default: 10, max: 50)
 *   - category: filter by category (optional)
 */

export async function GET(request: NextRequest) {
  try {
    const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '10'), 50);
    const category = request.nextUrl.searchParams.get('category');

    let articles;

    if (category) {
      articles = getArticlesByCategory(category).slice(0, limit);
    } else {
      articles = getRecentArticles(limit);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          articles,
          count: articles.length,
          category: category || 'all',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching articles',
      },
      { status: 500 }
    );
  }
}
