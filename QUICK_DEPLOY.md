# 🚀 Quick Hostinger Deployment Guide

## For Static Website (Recommended)

### Step 1: Build Your Website
```bash
npm run build
```

### Step 2: Upload to Hostinger
1. **Login to Hostinger Control Panel**
2. **Go to File Manager**
3. **Navigate to public_html folder**
4. **Upload all files from the `out` folder** (not the folder itself)

### Step 3: Test Your Website
- Visit your domain to see the live website
- Test all pages: Home, Stories, Blog, Contact, etc.

## Alternative: Deploy to Vercel (Easier with Authentication)

If you want to keep all features including user authentication:

1. **Push your code to GitHub**
2. **Go to vercel.com**
3. **Connect your GitHub repository**
4. **Deploy automatically**
5. **Add environment variables in Vercel dashboard**

### Vercel Environment Variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=gcn1lnqk
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-29
SANITY_API_TOKEN=your-token
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
GOOGLE_CLIENT_ID=your-google-id
GOOGLE_CLIENT_SECRET=your-google-secret
FACEBOOK_CLIENT_ID=your-facebook-id
FACEBOOK_CLIENT_SECRET=your-facebook-secret
```

## What Works in Static Version:
✅ Beautiful responsive design
✅ All pages (Home, Stories, Blog, Contact, etc.)
✅ Contact forms
✅ Success stories
✅ Blog posts (if using Sanity)
✅ Mobile-friendly navigation

## What Requires Server (Vercel):
🔐 User authentication
🔐 Social login
🔐 User profiles
🔐 Admin dashboard

## Quick Upload Instructions:
1. Find your `out` folder after building
2. Upload ALL contents to Hostinger's `public_html`
3. Your website will be live immediately!

## Need Help?
- **Static issues**: Check file paths
- **Want authentication**: Use Vercel instead
- **Domain setup**: Configure in Hostinger DNS
