/**
 * SEO Utilities for Hantavirus Tracker
 * Generates meta tags, structured data, and optimization helpers
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  robots?: string;
}

export const defaultSEOMetadata: SEOMetadata = {
  title: 'Hantavirus Tracker - Real-Time Outbreak Monitoring & News',
  description:
    'Track hantavirus outbreaks in real-time with our interactive world map. Get latest hantavirus news, statistics, and updates from CDC, WHO, and global health sources. Monitor HPS cases worldwide.',
  keywords: [
    'hantavirus',
    'hantavirus outbreak',
    'hantavirus news',
    'hantavirus cases',
    'hantavirus tracker',
    'HPS virus',
    'hemorrhagic fever',
    'hantavirus map',
    'hantavirus statistics',
    'rodent borne virus',
    'hantavirus prevention',
    'hantavirus treatment',
    'hantavirus symptoms',
    'hantavirus deaths',
    'global outbreak tracker',
    'disease tracking',
    'public health',
  ],
  ogImage: 'https://hantavirusnews.com/og-image.png',
  ogUrl: 'https://hantavirusnews.com',
  canonical: 'https://hantavirusnews.com',
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
};

/**
 * Generate JSON-LD structured data for search engines
 */
export function generateJsonLD(type: 'WebSite' | 'NewsArticle' | 'Organization') {
  const baseData = {
    '@context': 'https://schema.org',
    name: 'Hantavirus Tracker',
    description:
      'Real-time monitoring of hantavirus outbreaks worldwide with news aggregation and interactive mapping',
    url: 'https://hantavirusnews.com',
    mainEntity: {
      '@type': 'Organization',
      name: 'Hantavirus Tracker',
      url: 'https://hantavirusnews.com',
      logo: 'https://hantavirusnews.com/logo.png',
      description: 'Global hantavirus outbreak tracking and news platform',
      sameAs: [
        'https://twitter.com/hantavirustracker',
        'https://facebook.com/hantavirustracker',
      ],
    },
  };

  switch (type) {
    case 'WebSite':
      return {
        '@type': 'WebSite',
        ...baseData,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://hantavirusnews.com?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      };

    case 'NewsArticle':
      return {
        '@type': 'NewsArticle',
        ...baseData,
        articleSection: 'Health',
        keywords: 'hantavirus,outbreak,news',
      };

    case 'Organization':
      return {
        '@type': 'Organization',
        ...baseData,
      };

    default:
      return baseData;
  }
}

/**
 * Generate meta tags for HTML head
 */
export function generateMetaTags(metadata: SEOMetadata): string[] {
  const tags = [
    `<title>${metadata.title}</title>`,
    `<meta name="description" content="${metadata.description}" />`,
    `<meta name="keywords" content="${metadata.keywords.join(', ')}" />`,
    `<meta name="robots" content="${metadata.robots || 'index, follow'}" />`,
    `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
    `<meta charset="utf-8" />`,
    // Open Graph tags
    `<meta property="og:title" content="${metadata.title}" />`,
    `<meta property="og:description" content="${metadata.description}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${metadata.ogUrl || 'https://hantavirusnews.com'}" />`,
    `<meta property="og:image" content="${metadata.ogImage || 'https://hantavirusnews.com/og-image.png'}" />`,
    // Twitter tags
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${metadata.title}" />`,
    `<meta name="twitter:description" content="${metadata.description}" />`,
    `<meta name="twitter:image" content="${metadata.ogImage || 'https://hantavirusnews.com/og-image.png'}" />`,
    // Canonical
    `<link rel="canonical" href="${metadata.canonical || 'https://hantavirusnews.com'}" />`,
    // Additional SEO
    `<meta name="author" content="Hantavirus Tracker" />`,
    `<meta name="last-modified" content="${new Date().toISOString()}" />`,
    `<link rel="alternate" hrefLang="en" href="https://hantavirusnews.com" />`,
  ];

  return tags;
}

/**
 * Keywords for SEO optimization
 */
export const seoKeywords = {
  primary: [
    'hantavirus',
    'hantavirus outbreak',
    'hantavirus news',
    'hantavirus tracker',
  ],
  secondary: [
    'HPS virus',
    'hantavirus pulmonary syndrome',
    'hemorrhagic fever',
    'rodent borne virus',
    'hantavirus map',
    'hantavirus cases',
    'hantavirus deaths',
    'hantavirus statistics',
  ],
  long_tail: [
    'hantavirus outbreak 2024',
    'hantavirus prevention tips',
    'hantavirus symptoms and treatment',
    'where is hantavirus found',
    'hantavirus death rate',
    'hantavirus transmission',
    'hantavirus rodent control',
    'hantavirus news today',
    'global disease tracker',
    'public health surveillance',
  ],
  location: [
    'hantavirus USA',
    'hantavirus California',
    'hantavirus Colorado',
    'hantavirus New Mexico',
    'hantavirus Argentina',
    'hantavirus Europe',
  ],
};

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbs() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hantavirusnews.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Hantavirus Tracker',
        item: 'https://hantavirusnews.com/tracker',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Outbreak Map',
        item: 'https://hantavirusnews.com/map',
      },
    ],
  };
}

/**
 * Generate FAQ schema for SEO
 */
export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is hantavirus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hantavirus is a genus of viruses spread mainly by contact with infected rodents. The virus can cause hantavirus pulmonary syndrome (HPS), which is a serious and potentially fatal respiratory disease.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is hantavirus transmitted?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hantavirus is transmitted primarily through contact with infected rodent droppings, urine, or saliva. It can also be spread through inhalation of contaminated dust.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are hantavirus symptoms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Early symptoms include fatigue, fever, muscle aches, headaches, and chills. This can progress to coughing and shortness of breath in severe cases.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I prevent hantavirus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prevent hantavirus by avoiding rodent contact, sealing home cracks, storing food properly, and cleaning potential rodent areas with proper protection.',
        },
      },
    ],
  };
}
