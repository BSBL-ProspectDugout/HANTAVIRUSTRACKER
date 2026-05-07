import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import { generateJsonLD, defaultSEOMetadata, generateFAQSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: defaultSEOMetadata.title,
  description: defaultSEOMetadata.description,
  keywords: defaultSEOMetadata.keywords,
  robots: defaultSEOMetadata.robots,
  alternates: {
    canonical: defaultSEOMetadata.canonical,
  },
  openGraph: {
    title: defaultSEOMetadata.title,
    description: defaultSEOMetadata.description,
    url: defaultSEOMetadata.ogUrl,
    siteName: 'Hantavirus Tracker',
    images: [
      {
        url: defaultSEOMetadata.ogImage || '',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultSEOMetadata.title,
    description: defaultSEOMetadata.description,
    images: [defaultSEOMetadata.ogImage || ''],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateJsonLD('WebSite');
  const faqSchema = generateFAQSchema();

  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        {/* Google Analytics */}
        {(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || process.env.NEXT_PUBLIC_GA_ID) && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || process.env.NEXT_PUBLIC_GA_ID}', {
                    anonymize_ip: true,
                    allow_google_signals: true,
                    allow_ad_personalization: true,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://newsapi.org" />

        {/* Additional SEO */}
        <meta name="theme-color" content="#dc2626" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="red" />
      </head>
      <body>{children}</body>
    </html>
  );
}
