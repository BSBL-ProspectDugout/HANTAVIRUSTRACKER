'use client';

import { useEffect } from 'react';

interface AdSenseBlockProps {
  adSlot: string;
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  style?: React.CSSProperties;
}

export default function AdSenseBlock({
  adSlot,
  adFormat = 'auto',
  style,
}: AdSenseBlockProps) {
  useEffect(() => {
    try {
      // Initialize AdSense if the script is loaded
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
        }}
        data-ad-layout={adFormat === 'auto' ? 'in-article' : undefined}
        data-ad-format={adFormat}
        data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID}`}
        data-ad-slot={adSlot}
      />
    </div>
  );
}
