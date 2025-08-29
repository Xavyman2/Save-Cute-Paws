# 🚀 Save Cute Paws - Hostinger Deployment Guide

## Prerequisites
1. **Hostinger Account** with hosting plan
2. **Domain Name** (optional, can use subdomain)
3. **Sanity Production Account** (if using CMS features)

## Step 1: Prepare Your Project for Production

### Build the Static Version
```bash
npm run build
```

This creates an optimized static version in the `out/` folder.

## Step 2: Environment Variables Setup

### Update Production URLs
1. Copy `.env.production` to `.env.local` on your local machine
2. Update `NEXTAUTH_URL` to your actual domain:
   ```
   NEXTAUTH_URL="https://yourdomain.com"
   ```

### Sanity Production Setup
1. Go to [sanity.io](https://sanity.io) 
2. Create a production dataset
3. Generate a new API token for production
4. Update the token in your environment variables

## Step 3: Hostinger Upload Methods

### Method A: File Manager Upload (Recommended)
1. **Login to Hostinger Control Panel**
2. **Go to File Manager**
3. **Navigate to public_html folder**
4. **Delete existing files** (if any)
5. **Upload the `out` folder contents**:
   - Upload all files from `out/` folder
   - NOT the `out` folder itself, just its contents
6. **Set file permissions** to 644 for files, 755 for folders

### Method B: FTP Upload
1. **Get FTP credentials** from Hostinger
2. **Use FileZilla or similar FTP client**
3. **Connect to your server**
4. **Upload `out/` folder contents** to `public_html/`

### Method C: Git Deployment (Advanced)
1. **Push your code to GitHub**
2. **Use Hostinger's Git integration** (if available)
3. **Set up automatic deployments**

## Step 4: Database & CMS Configuration

### Sanity Studio Deployment
If you want to use the CMS:
1. **Deploy Sanity Studio separately**:
   ```bash
   npx sanity deploy
   ```
2. **Choose a studio hostname** (e.g., `save-cute-paws-studio`)
3. **Access studio at**: `https://save-cute-paws-studio.sanity.studio`

### Environment Variables on Hostinger
1. **Go to Hostinger Control Panel**
2. **Find "Environment Variables" section**
3. **Add all variables from `.env.production`**
4. **Save and restart** (if option available)

## Step 5: Domain & SSL Setup

### Domain Configuration
1. **Point domain to Hostinger** (if external domain)
2. **Update DNS settings**
3. **Wait for propagation** (up to 24 hours)

### SSL Certificate
1. **Enable SSL** in Hostinger control panel
2. **Force HTTPS redirect**
3. **Update NEXTAUTH_URL** to use `https://`

## Step 6: Testing & Verification

### Test Checklist
- [ ] Website loads correctly
- [ ] Navigation works
- [ ] Images display properly
- [ ] Contact form works
- [ ] Blog posts display (if using Sanity)
- [ ] Authentication works (if configured)
- [ ] Mobile responsiveness

### Common Issues & Solutions

**Images not loading:**
- Check image paths in code
- Ensure images are in the `out/` folder
- Verify remote image domains are accessible

**Authentication issues:**
- Update `NEXTAUTH_URL` to production domain
- Check social provider redirect URLs
- Ensure environment variables are set

**Styling issues:**
- Clear browser cache
- Check CSS file paths
- Verify Tailwind build process

## Step 7: Ongoing Maintenance

### Content Updates
- Use Sanity Studio for content management
- Changes appear automatically on website

### Code Updates
1. **Make changes locally**
2. **Run `npm run build`**
3. **Upload new `out/` folder contents**
4. **Clear cache if needed**

## Alternative: Vercel Deployment (Easier)

If Hostinger proves challenging, consider Vercel:
1. **Push code to GitHub**
2. **Connect Vercel to repository**
3. **Auto-deploys on every push**
4. **Built-in environment variables**
5. **Free tier available**

## Support Resources
- **Hostinger Support**: Available 24/7
- **Next.js Documentation**: nextjs.org/docs
- **Sanity Documentation**: sanity.io/docs

---

**Note**: This is a static deployment. Advanced features like server-side authentication may require additional setup or a different hosting approach.
