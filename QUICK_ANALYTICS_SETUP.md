# Quick Google Analytics & AdSense Setup (5 Minutes)

## ⚡ What You Need to Do

### Step 1: Get Google Analytics ID (5 min)
1. Go to: https://analytics.google.com/
2. Click "Create" → "Account"
3. Name: `Hantavirus Tracker`
4. Property name: `hantavirusnews.com`
5. Accept all terms
6. Copy your **Measurement ID** (looks like: `G-ABC123DEF45`)

### Step 2: Add to Vercel (2 min)
1. Go to: https://vercel.com/dashboard
2. Select your `HANTAVIRUSTRACKER` project
3. Click **Settings** → **Environment Variables**
4. Add:
   ```
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = G-ABC123DEF45
   ```
5. Click "Save"
6. Site will auto-redeploy

### Step 3: Get Google AdSense ID (24-48 hours)
1. Go to: https://www.google.com/adsense/
2. Click **Sign up** (if first time)
3. Enter website: `hantavirusnews.com`
4. Google will verify your site (24-48 hours)
5. You'll get an email when approved
6. Copy **Publisher ID** from dashboard

### Step 4: Add AdSense to Vercel (2 min)
1. After approval, copy your Publisher ID
2. Example: `ca-pub-1234567890123456`
3. Remove "ca-pub-" prefix: `1234567890123456`
4. Add to Vercel Environment Variables:
   ```
   NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID = 1234567890123456
   ```
5. Save and redeploy

---

## ✅ What's Already Done

✅ Analytics tracking code installed
✅ AdSense ad slots placed (5 locations on page)
✅ Environment variables configured
✅ Auto-deployed to Vercel

---

## 📊 After Setup - Track Your Earnings

### Google Analytics
- Real-time visitors: https://analytics.google.com/ → Real-time
- Where visitors come from
- What content they read
- Device, location, behavior

### Google AdSense
- Ad earnings: https://adsense.google.com/ → Performance
- Impressions & clicks
- Ad revenue per 1000 views (RPM)
- Top performing placements

---

## 💰 Expected Timeline

| Service | Setup | Start Earning | Payout |
|---------|-------|---------------|--------|
| **Analytics** | Instant | Immediate | N/A |
| **AdSense** | 24-48 hrs | 7-30 days | 21st of month |

---

## 🚀 Tips to Maximize Earnings

1. **More Traffic** = More Earnings
   - Improve SEO (you're already doing this!)
   - Share on social media
   - Build backlinks

2. **Better Ad Performance**
   - High-quality, fresh content (hantavirus news)
   - Keep site clean and fast
   - Optimize ad placements

3. **Monitor Performance**
   - Check analytics daily
   - Track which articles get views
   - Update underperforming content

---

## ❓ Need Help?

See full guide: `ANALYTICS_SETUP.md` in this repo

Quick questions:
- **Analytics not tracking?** → Check NEXT_PUBLIC_GOOGLE_ANALYTICS_ID is set
- **Ads not showing?** → Wait 24+ hours after AdSense approval
- **Low earnings?** → Need more traffic to the site

