import { NextResponse, NextRequest } from 'next/server';
import { scrapeAllHantavirusData, generateArticleTopics } from '@/lib/data-scraper';
import { generateArticles } from '@/lib/article-generator';
import { saveArticle, getPublishingStats } from '@/lib/article-publisher';

/**
 * POST /api/generate-articles
 *
 * Generates fresh hantavirus articles automatically
 * Can be called manually or via scheduled task (cron)
 *
 * Authentication: Requires API token in header for security
 * Usage: curl -X POST https://hantavirusnews.com/api/generate-articles \
 *        -H "Authorization: Bearer your-secret-token"
 */

export async function POST(request: NextRequest) {
  try {
    // Security check - verify API token
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.ARTICLE_GENERATION_API_KEY;

    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('📝 Starting automated article generation...');

    // Step 1: Scrape real hantavirus data
    console.log('🔍 Step 1: Scraping hantavirus data...');
    const hantavirusData = await scrapeAllHantavirusData();
    console.log(`✅ Data scraped: ${hantavirusData.totalCases} cases, ${hantavirusData.totalDeaths} deaths`);

    // Step 2: Generate article topics based on data
    console.log('📋 Step 2: Generating article topics...');
    const topics = generateArticleTopics(hantavirusData);
    console.log(`✅ Generated ${topics.length} article topics`);

    // Step 3: Create articles from topics
    console.log('✍️  Step 3: Creating articles...');
    const articles = generateArticles(topics);
    console.log(`✅ Created ${articles.length} articles`);

    // Step 4: Save articles to storage
    console.log('💾 Step 4: Saving articles...');
    let savedCount = 0;
    for (const article of articles) {
      if (saveArticle(article)) {
        savedCount++;
      }
    }
    console.log(`✅ Saved ${savedCount} articles`);

    // Step 5: Get updated statistics
    const stats = getPublishingStats();

    const response = {
      success: true,
      message: `Generated and published ${savedCount} articles`,
      data: {
        articlesCreated: savedCount,
        topics: topics.map((t) => t.title),
        statistics: stats,
        timestamp: new Date().toISOString(),
      },
    };

    console.log('✅ Article generation complete!');
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('❌ Error generating articles:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error generating articles',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/generate-articles
 *
 * Returns current article generation statistics
 * No authentication required
 */
export async function GET() {
  try {
    const stats = getPublishingStats();

    return NextResponse.json(
      {
        success: true,
        data: {
          stats,
          message: `${stats.totalArticles} total articles generated`,
          generatedToday: stats.articlesToday,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching statistics',
      },
      { status: 500 }
    );
  }
}
