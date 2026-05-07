# Monetization Guide

Learn how to generate revenue from your Hantavirus Tracker website.

## 📊 Revenue Options Overview

| Option | Setup Time | Monthly Potential | Difficulty |
|--------|-----------|------------------|-----------|
| Google AdSense | 15 min | $100-2000 | Easy |
| Affiliate Marketing | 30 min | $50-500 | Easy |
| Display Networks | 20 min | $200-1000 | Easy |
| Sponsored Content | 1 hour | $500-5000 | Medium |
| Premium Features | 4 hours | $1000-10000 | Hard |
| Newsletter | 2 hours | $200-2000 | Medium |

---

## 1. Google AdSense (Best for Beginners)

### How It Works
- Google displays relevant ads on your site
- You earn money when people view or click ads
- Payment: Monthly, minimum $100 to cash out
- Revenue: Average $1-5 per 1000 views (CPM)

### Setup Steps

#### Step 1: Sign Up
1. Go to https://www.google.com/adsense/
2. Click "Sign up now"
3. Use your Google account or create one
4. Enter your website URL (hantavirusnews.com)

#### Step 2: Add Your Environment Variable
```bash
# In your .env.local file, add:
NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID=your_publisher_id
```

**Where to find your Publisher ID:**
1. Log into Google AdSense
2. Go to Settings → Account
3. Your Publisher ID is shown (format: ca-pub-0000000000000000)
4. Copy just the number part (0000000000000000)

#### Step 3: Code Already Integrated
The ad placements are already in your app:
- Top banner ad
- Mid-page ad (after stats)
- Sidebar ad (next to news)
- Bottom ad (before footer)

#### Step 4: Deploy
```bash
# Rebuild and deploy
npm run build
npm start
```

Or deploy to Vercel (it auto-rebuilds):
```bash
git push origin main
```

#### Step 5: Wait for Approval
Google reviews your site (1-7 days)
- Needs minimum traffic
- Original, quality content
- Complies with AdSense policies

### Revenue Expectations
- **100 daily visitors**: $10-50/month
- **1,000 daily visitors**: $100-500/month
- **10,000 daily visitors**: $1,000-5,000/month

### Tips to Increase AdSense Revenue
1. **Place ads strategically** - We've already done this
2. **Increase traffic** - Use SEO, social media
3. **Get better CPM** - Target countries with high ad rates
4. **Quality content** - Better content = higher CPM
5. **Responsive design** - Mobile traffic earns less, but volume helps

---

## 2. Other Ad Networks (Higher Rates)

### Mediavine
- Minimum: 25,000 monthly pageviews
- CPM: $10-50 (higher than AdSense)
- Requires application approval

### AdThrive
- Minimum: 100,000 monthly pageviews
- CPM: $10-50
- Premium service with dedicated support

### Ezoic
- Minimum: 1000 monthly pageviews
- CPM: Higher than AdSense, AI-optimized
- Setup: https://www.ezoic.com/

### PropellerAds
- Minimum: 5,000 monthly pageviews
- CPM: $5-15
- Easy approval, fast payments

---

## 3. Affiliate Marketing

### How It Works
Earn commissions when people click your links and make purchases.

### Best Affiliate Programs for Health Sites

#### Amazon Associates
- Commission: 3-10% of sale price
- Setup: https://affiliate-amazon.com/
- Great for: Health products, protective gear

#### HealthLine
- Commission: $10-50 per referral
- Setup: Apply at https://www.healthline.com/partners

#### Thrive Market
- Commission: 25-40% recurring
- Setup: https://www.thrivemarket.com/affiliates

### Implementation
Create a component for affiliate links:

```typescript
// components/AffiliateLink.tsx
export default function AffiliateLink({
  text,
  url,
  affiliateId,
}: {
  text: string;
  url: string;
  affiliateId: string;
}) {
  return (
    <a 
      href={`${url}?tag=${affiliateId}`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="text-blue-600 hover:underline"
    >
      {text}
    </a>
  );
}
```

### Recommendations Section
Add a section suggesting protective products, DEET, rodent control, etc.

---

## 4. Sponsored Content

### How It Works
Health companies, prevention product makers, and public health organizations pay to have content featured.

### Typical Sponsors
- Pest control companies
- Public health campaigns
- Health insurance companies
- Prevention product manufacturers
- Medical research organizations

### Implementation Options
1. **Sponsored News Articles** - Featured articles section
2. **Sponsored Product Recommendations** - Health products
3. **Branded Content** - Clearly marked sponsored sections
4. **Banner Sponsorships** - Logo placement + link

### Pricing
- CPM-based: $10-50 per 1000 views
- Flat rate: $500-5000/month
- Per article: $200-1000

### Contact Prospects
- Health departments
- CDC partners
- Pest control companies
- Public health NGOs
- Medical supply companies

---

## 5. Newsletter Monetization

### Add an Email Newsletter
Build audience through email, then monetize.

### Implementation
```typescript
// Add to your page
<form className="mt-8 p-4 bg-blue-50 rounded">
  <h3 className="font-bold mb-2">Get Weekly Hantavirus Updates</h3>
  <input type="email" placeholder="Your email" className="p-2 border w-full mb-2" />
  <button className="bg-blue-600 text-white px-4 py-2 rounded">Subscribe</button>
</form>
```

### Monetization Options
- Sponsored emails ($500-2000 per issue)
- Affiliate products ($200-1000/month)
- Premium content ($5-20/month per subscriber)
- Partner promotions

### Tools
- Substack (easy, no coding needed)
- ConvertKit (email marketing platform)
- Mailchimp (free tier available)

---

## 6. Premium/Membership Features

### What You Can Sell
- Advanced analytics dashboard
- Email alerts for specific regions
- Historical data export
- API access for developers
- Ad-free experience

### Pricing Example
```
Free: Basic map + news feed
$5/month: Email alerts + premium analytics
$15/month: API access + custom reports
$50/month: Enterprise support
```

### Implementation
```typescript
// Paywall component example
if (user.isPremium) {
  return <AdvancedAnalytics data={data} />;
} else {
  return (
    <div>
      <BasicAnalytics data={data.slice(0, 3)} />
      <div className="bg-yellow-100 p-4 rounded mt-4">
        <p>Upgrade to Premium for full analytics</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
```

---

## 7. Donations & Support

### Add Donation Button
```typescript
<div className="bg-gray-50 p-6 rounded text-center">
  <h3 className="font-bold mb-2">Support This Project</h3>
  <p>Help keep this tracking tool free and ad-free</p>
  <button className="bg-green-600 text-white px-6 py-2 rounded mt-4">
    Donate via PayPal
  </button>
</div>
```

### Donation Platforms
- PayPal Donations
- Buy Me a Coffee (buymeacoffee.com)
- Patreon
- Open Collective
- Ko-fi

---

## 🎯 Recommended Strategy

### Month 1-2: Start with AdSense
1. ✅ Already integrated in your code
2. ✅ Easiest to set up
3. ✅ Get some baseline revenue

### Month 3: Add More Ad Networks
1. Wait for AdSense approval
2. Apply to Ezoic or PropellerAds
3. Test which performs best

### Month 4+: Diversify
1. Add affiliate links
2. Reach out to sponsors
3. Start newsletter
4. Consider premium features

---

## 💰 Getting Started Right Now

### Step 1: Enable AdSense (15 minutes)
```bash
# 1. Sign up: https://www.google.com/adsense/
# 2. Get your Publisher ID (ca-pub-xxxx)
# 3. Create .env.local file:
echo 'NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID=YOUR_PUBLISHER_ID' > .env.local

# 4. Rebuild
npm run build
npm start

# 5. Deploy to Vercel or your server
```

### Step 2: Submit Site to AdSense
- Google will review (1-7 days)
- Once approved, ads appear automatically
- Check AdSense dashboard for earnings

### Step 3: Promote Your Site
- SEO (optimize for "hantavirus", "hanta virus", "HPS")
- Social media (Twitter, Reddit, Health forums)
- Health communities (r/health, Facebook groups)
- News aggregators

---

## 📈 Expected Timeline

| Month | Visitors | Revenue |
|-------|----------|---------|
| 1 | 100-500 | $0-10 (pending approval) |
| 2 | 500-2000 | $5-50 |
| 3 | 2000-5000 | $50-250 |
| 4 | 5000-10000 | $250-500 |
| 6 | 10000+ | $1000+ |

*These are estimates. Actual revenue depends on traffic, location, and content quality.*

---

## ⚠️ Important Rules

### Google AdSense Policies
- ✅ Original content
- ✅ Quality website
- ✅ Proper disclosure
- ❌ No click fraud
- ❌ No fake traffic
- ❌ No adult content (your site is fine)
- ❌ No copyright infringement

### FTC Affiliate Rules
- Clearly disclose affiliate links with "Affiliate Link" or "#ad"
- Don't mislead about commission
- Be honest about product recommendations

### Healthcare Content Rules
- ❌ Don't provide medical advice
- ✅ Link to official health sources
- ✅ Clear disclaimer about seeking professional help
- ❌ Don't claim to treat or cure diseases

### Your Current Disclaimer
Already in footer:
> ⚠️ This is a tracking tool. Always consult official health agencies for medical advice.

---

## 🚀 Next Steps

1. **Right now**: Sign up for Google AdSense
   - https://www.google.com/adsense/
   
2. **This week**: 
   - Get your Publisher ID
   - Add to .env.local
   - Deploy website
   
3. **Next 2 weeks**:
   - Promote to get traffic
   - Wait for AdSense approval
   - Track earnings in dashboard

4. **Next month**:
   - Optimize ad placements
   - Add more traffic sources
   - Consider other networks

---

## 📞 Support & Resources

### AdSense Help
- https://support.google.com/adsense/
- YouTube channel: Google AdSense (official tutorials)
- Average CPM by country: https://www.statista.com/chart/15590/estimated-worldwide-ecpm/

### Other Resources
- Make Money Online (subreddit): r/beermoney, r/passive_income
- Blogging communities: Medium, Dev.to (though ads harder there)
- Affiliate networks directory: https://www.affiliatewindow.com/

---

Good luck! You've built a great site. Now let's make it profitable! 🎉
