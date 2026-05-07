import { GeneratedArticle } from './article-generator';
import fs from 'fs';
import path from 'path';

/**
 * Article Publisher & Storage System
 * Saves generated articles and makes them accessible via API
 */

const ARTICLES_DIR = path.join(process.cwd(), 'public', 'generated-articles');

/**
 * Initialize articles directory
 */
export function initializeArticlesStorage() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
    console.log('✅ Articles directory created');
  }
}

/**
 * Save article to storage
 */
export function saveArticle(article: GeneratedArticle): boolean {
  try {
    initializeArticlesStorage();

    const filePath = path.join(ARTICLES_DIR, `${article.slug}.json`);

    // Store article metadata
    const articleData = {
      ...article,
      savedAt: new Date().toISOString(),
    };

    fs.writeFileSync(filePath, JSON.stringify(articleData, null, 2));

    console.log(`✅ Article saved: ${article.slug}`);
    return true;
  } catch (error) {
    console.error(`❌ Error saving article:`, error);
    return false;
  }
}

/**
 * Get all generated articles
 */
export function getAllArticles(): GeneratedArticle[] {
  try {
    if (!fs.existsSync(ARTICLES_DIR)) {
      return [];
    }

    const files = fs.readdirSync(ARTICLES_DIR);
    const articles: GeneratedArticle[] = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(ARTICLES_DIR, file);
        const data = fs.readFileSync(filePath, 'utf-8');
        const article = JSON.parse(data);
        articles.push(article);
      }
    }

    // Sort by publish date (newest first)
    return articles.sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } catch (error) {
    console.error('❌ Error reading articles:', error);
    return [];
  }
}

/**
 * Get article by slug
 */
export function getArticleBySlug(slug: string): GeneratedArticle | null {
  try {
    const filePath = path.join(ARTICLES_DIR, `${slug}.json`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`❌ Error reading article:`, error);
    return null;
  }
}

/**
 * Get recent articles (for homepage feed)
 */
export function getRecentArticles(limit: number = 10): GeneratedArticle[] {
  const articles = getAllArticles();
  return articles.slice(0, limit);
}

/**
 * Get articles by category
 */
export function getArticlesByCategory(category: string): GeneratedArticle[] {
  const articles = getAllArticles();
  return articles.filter((article) => article.category === category);
}

/**
 * Delete old articles (keep only recent ones)
 */
export function cleanupOldArticles(keepCount: number = 100) {
  try {
    const articles = getAllArticles();

    if (articles.length > keepCount) {
      const toDelete = articles.slice(keepCount);

      for (const article of toDelete) {
        const filePath = path.join(ARTICLES_DIR, `${article.slug}.json`);
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted old article: ${article.slug}`);
      }

      console.log(`✅ Cleanup complete: deleted ${toDelete.length} old articles`);
    }
  } catch (error) {
    console.error('❌ Error cleaning up old articles:', error);
  }
}

/**
 * Generate RSS feed from articles
 */
export function generateRSSFeed(): string {
  const articles = getRecentArticles(20);
  const baseUrl = 'https://hantavirusnews.com';

  let rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Hantavirus Tracker - Latest News & Updates</title>
    <link>${baseUrl}</link>
    <description>Real-time hantavirus outbreak tracking and latest news</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
`;

  for (const article of articles) {
    rssContent += `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${baseUrl}/articles/${article.slug}</link>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${new Date(article.publishDate).toUTCString()}</pubDate>
      <guid>${baseUrl}/articles/${article.slug}</guid>
      <category>${escapeXml(article.category)}</category>
      <content:encoded><![CDATA[${article.content}]]></content:encoded>
    </item>
`;
  }

  rssContent += `
  </channel>
</rss>`;

  return rssContent;
}

/**
 * Helper function to escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate sitemap for SEO
 */
export function generateSitemap(): string {
  const articles = getAllArticles();
  const baseUrl = 'https://hantavirusnews.com';

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  for (const article of articles) {
    sitemap += `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${new Date(article.publishDate).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  sitemap += `
</urlset>`;

  return sitemap;
}

/**
 * Get publishing statistics
 */
export function getPublishingStats() {
  const articles = getAllArticles();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const articlesToday = articles.filter((a) => {
    const pubDate = new Date(a.publishDate);
    pubDate.setHours(0, 0, 0, 0);
    return pubDate.getTime() === today.getTime();
  });

  return {
    totalArticles: articles.length,
    articlesToday: articlesToday.length,
    categories: [...new Set(articles.map((a) => a.category))],
    lastPublished: articles[0]?.publishDate || null,
    avgReadTime: articles.length > 0 ? Math.round(articles.reduce((sum, a) => sum + a.readTime, 0) / articles.length) : 0,
  };
}
