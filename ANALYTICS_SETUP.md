# Google Analytics & AdSense Setup Guide

This guide will help you set up Google Analytics and Google AdSense on your Hantavirus Tracker website.

## Part 1: Google Analytics 4 Setup

### Step 1: Create a Google Analytics Account
1. Go to https://analytics.google.com/
2. Click "Start Measuring"
3. Create a new property named "Hantavirus Tracker"
4. Select your timezone and currency
5. Fill in website information:
   - Website name: Hantavirus Tracker
   - Website URL: https://hantavirusnews.com
6. Accept the terms and create the property

### Step 2: Get Your Measurement ID
1. In Google Analytics, go to **Admin** (bottom left)
2. Select your property in the left column
3. Click **Data Streams**
4. Click **Web**
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Add to Vercel
1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add new variable:
   - Name: `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
   - Value: `G-XXXXXXXXXX` (paste your Measurement ID)
4. Save and redeploy

---

## Part 2: Google AdSense Setup

### Step 1: Sign Up for AdSense
1. Go to https://www.google.com/adsense/
2. Click "Sign up now"
3. Use your Google account (create one if needed)
4. Fill in the application:
   - Website: https://hantavirusnews.com
   - Category: Health & Medicine / Science
   - Language: English
5. Accept the terms and submit

### Step 2: Verification & Approval
1. Google will verify your site (usually 24-48 hours)
2. You'll receive an email when approved
3. Add the verification code to your site (Google will provide instructions)

### Step 3: Get Your AdSense Client ID
Once approved:
1. Go to https://adsense.google.com/
2. Click **Account** → **Account information**
3. Copy your **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`)
4. Remove the "ca-pub-" prefix and copy just the numbers

### Step 4: Add to Vercel
1. Go to your Vercel project **Settings** → **Environment Variables**
2. Add new variable:
   - Name: `NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID`
   - Value: `XXXXXXXXXXXXXXXX` (just the numbers, without ca-pub-)
3. Save and redeploy

---

## Part 3: Create Ad Units (Optional but Recommended)

After approval, create specific ad units for better tracking:

1. Go to AdSense dashboard
2. Click **Ads** → **Ad units** → **Create new ad unit**
3. Create ad units for:
   - Display ads (rectangles, leaderboard)
   - In-article ads
   - Matched content
4. Note the ad unit IDs for tracking

---

## Part 4: Monitor Performance

### Google Analytics
- View real-time users: **Real-time** section
- Track page views, bounce rate, engagement
- Set up conversion goals for clicks
- Monitor by device, country, referral source

### Google AdSense
- View earnings: **Home** → Performance dashboard
- Track ad impressions, clicks, CTR
- View top-performing placements
- Monitor ad revenue by day

---

## Implementation Status

✅ **Already Configured:**
- Google Analytics code in `app/layout.tsx`
- Google AdSense ad slots in `app/page.tsx` (5 placements)
- Environment variable setup

📋 **Still Needed:**
- Get your Measurement ID from Google Analytics
- Get your AdSense Publisher ID
- Add environment variables to Vercel
- Submit AdSense application (if not already done)

---

## Estimated Timeline

- **Google Analytics**: Instant (just add ID)
- **Google AdSense**: 
  - Application: 24-48 hours for approval
  - Earnings appear: Can take a few weeks to start
  - Payout: Typically around the 21st of the following month

---

## Tips for Better Earnings

1. **Content Quality**: Keep hantavirus news and data current
2. **Traffic**: Drive more visitors through SEO and social media
3. **Ad Placement**: Use high-visibility placements (above fold)
4. **User Experience**: Avoid too many ads (impacts UX)
5. **Keywords**: High-value health keywords perform well

---

## Troubleshooting

### Analytics not tracking:
- Check that `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` is set in Vercel
- Clear browser cache
- Check DevTools console for errors

### Ads not showing:
- Verify `NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID` is correct
- Wait 24+ hours after approval for ads to start serving
- Check AdSense policies (no ads on under-construction sites)
- Check browser console for ad-related errors

### Low AdSense earnings:
- Increase site traffic
- Improve content quality and SEO
- Optimize ad placements
- Use multiple ad formats

