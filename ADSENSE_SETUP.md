# Google AdSense Quick Setup (5 Minutes)

Get ads running on your Hantavirus Tracker website in 5 minutes.

## ⚡ Quick Setup

### Step 1: Sign Up (2 minutes)
1. Go to https://www.google.com/adsense/
2. Click "Sign up now"
3. Log in with your Google account (or create one)
4. Enter your website URL:
   - `https://hantavirusnews.com` or
   - `https://hantanews.com` or
   - Your Vercel deployment URL

### Step 2: Get Your Publisher ID (1 minute)
1. After signup, Google sends a verification email
2. Click the link in the email
3. Go to **Settings** → **Account** → **Account information**
4. Find "Publisher ID" (looks like: `ca-pub-0000000000000000`)
5. Copy just the number part: `0000000000000000`

### Step 3: Add Environment Variable (1 minute)

Create or edit `.env.local` in your project:

```bash
# In hantavirus-tracker/ directory
echo 'NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID=YOUR_PUBLISHER_ID' > .env.local
```

Replace `YOUR_PUBLISHER_ID` with your actual ID (just the numbers, no "ca-pub-")

**Example:**
```
NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID=1234567890123456
```

### Step 4: Rebuild & Deploy (1 minute)

```bash
# Kill the current server (Ctrl+C)
# Then rebuild:
npm run build

# Test locally
npm run dev
# Visit http://localhost:3001 - ads won't show yet (needs domain)

# Deploy to Vercel or your server
git add .env.local
git commit -m "Add AdSense"
git push origin main
```

**For Vercel:**
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add `NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID=YOUR_PUBLISHER_ID`
4. Redeploy

### Step 5: Wait for Google Approval (1-7 days)

Google reviews your site for:
- ✅ Original content (you have it - hantavirus tracking)
- ✅ Quality (your site is professionally built)
- ✅ Traffic (they want active sites)
- ✅ Compliance (you have proper disclaimers)

Check your email for approval notification.

## ✅ Verification Checklist

After setup, verify everything is ready:

```bash
# 1. Check .env.local exists
cat .env.local
# Should show: NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID=...

# 2. Check AdSenseBlock component exists
ls components/AdSenseBlock.tsx
# Should exist

# 3. Check layout has AdSense script
grep "adsbygoogle" app/layout.tsx
# Should find it

# 4. Check page.tsx imports AdSenseBlock
grep "AdSenseBlock" app/page.tsx
# Should find it
```

## 🎯 Ad Placements

Your site has ads in these locations:

1. **Top Banner** (under header)
   - Horizontal ad, high visibility
   - Slot ID: 1234567890

2. **Mid-Page** (after stats cards)
   - Auto-responsive ad
   - Slot ID: 2345678901

3. **Sidebar** (next to news feed)
   - Vertical ad
   - Slot ID: 3456789012

4. **Between Content** (above outbreak table)
   - Auto-responsive ad
   - Slot ID: 4567890123

5. **Bottom Ad** (before footer)
   - Horizontal ad
   - Slot ID: 5678901234

All are already configured in `app/page.tsx`

## 💡 Pro Tips

### Increase Your Approval Chances
1. **Get some traffic first**
   - Share on Reddit: r/health, r/publichealth
   - Post on Twitter/X
   - Submit to health forums
   - Target: 100+ daily visitors before approval

2. **Optimize for AdSense**
   - ✅ You already have quality content
   - ✅ You already have responsive design
   - ✅ You already have disclaimers
   - ✅ You already have original content

3. **After Approval**
   - Monitor earnings in AdSense dashboard
   - Check which ad placements work best
   - Experiment with ad sizes
   - Consider premium ad networks after 1 month

### Earn More Money
- **Get More Traffic**
  - SEO for "hantavirus", "hantavirus news", "HPS"
  - Update content regularly
  - Share on health communities
  - Build backlinks

- **Better CPM (cost per 1000 views)**
  - Target higher-paying countries (USA, UK, Canada)
  - Quality content = higher CPM
  - Longer articles = more ad space = more revenue
  - Regular updates = more traffic = more revenue

## 📊 Timeline

- **Day 1**: Setup complete ✓
- **Day 1-7**: Google reviews (usually 3-5 days)
- **Day 7+**: Ads appear automatically
- **Month 1**: $0-50 (initial traffic building)
- **Month 2+**: $100+ (with promotion)

## 🚨 Common Issues

### "Ads Not Showing"
- **Cause**: Site needs approval (can take up to 7 days)
- **Fix**: Wait for Google approval email
- **Check**: AdSense dashboard → Summary (shows approval status)

### "Environment Variable Not Working"
- **Cause**: Variable not reloaded after edit
- **Fix**: 
  ```bash
  rm -rf .next
  npm run build
  npm run dev
  ```

### "AdSense Script Error"
- **Cause**: Usually DNS/connection issue
- **Fix**: Wait a few hours, Google's servers update slowly
- **Check**: Browser console (F12) for actual error message

### "Low Earnings"
- **Cause**: Not enough traffic
- **Fix**: Promote your site
- **Goal**: 1000+ daily visitors = $100+/month

## 📞 Support

### Google AdSense Help
- Help Center: https://support.google.com/adsense/
- AdSense Dashboard: https://adsense.google.com/
- Verification Issues: https://support.google.com/adsense/answer/10606038

### Troubleshooting
1. Check AdSense dashboard for:
   - Approval status
   - Earnings
   - Site health issues
   - Policy violations

2. Enable "Search Console" for more insights:
   - https://search.google.com/search-console/

3. Monitor "Page Experience" (important for Google):
   - Good loading speed ✓ (your site is fast)
   - No layout shifts ✓ (ads load properly)
   - Interaction ready ✓ (responsive)

## 🎉 You're Ready!

Your Hantavirus Tracker is now configured for AdSense monetization.

**Next Steps:**
1. ✅ Setup environment variable (DONE)
2. ⏳ Deploy to your domain
3. ⏳ Wait for Google approval (1-7 days)
4. ⏳ Start earning money!
5. ⏳ Promote to get more traffic

---

**Questions?** Check the full [MONETIZATION.md](MONETIZATION.md) guide for other revenue options.
