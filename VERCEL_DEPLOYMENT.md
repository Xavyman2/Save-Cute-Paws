# Vercel Deployment Environment Variables

## Required Environment Variables for Production

When deploying to Vercel, add these environment variables in your Vercel dashboard:

### Sanity CMS Variables (Ready to use)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=gcn1lnqk
NEXT_PUBLIC_SANITY_DATASET=production  
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-29
SANITY_API_TOKEN=skJCDjkfMMRGdMDhlfYvchIqSFJJECQOHookIKPPlqHXmP7istsCpKMdbRvxToGG6I5upQNakLH3eAfxxn5Pr9VDX8JKQkHTijWAZZUvfUrZPDLyvHdhjYEYJXYyxwe0NXhFXzIAluMHTeHdHEykbSeOVttPTyaXLN7FZ6dEcR7Stv0J4XOy
```

### NextAuth Variables (MUST UPDATE)
```
NEXTAUTH_SECRET=your-production-secret-here-make-it-long-and-random
NEXTAUTH_URL=https://your-app-name.vercel.app
```

### Social Media Provider Credentials (OPTIONAL - for social login)
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
```

## How to Add Environment Variables in Vercel:

1. Go to your project dashboard on Vercel
2. Click "Settings" tab
3. Click "Environment Variables" in the sidebar
4. Add each variable:
   - Name: Variable name (e.g., NEXTAUTH_SECRET)
   - Value: Variable value
   - Environment: Select "Production" (and "Preview" if you want)
5. Click "Save"

## Important Notes:

- **NEXTAUTH_SECRET**: Generate a random string at least 32 characters long
- **NEXTAUTH_URL**: Update this to your actual Vercel deployment URL after first deployment
- **Social Providers**: These are optional. The site will work without them (users can still register with email/password)

## Deployment Steps:

1. ✅ Code pushed to GitHub 
2. ⏳ Import repository in Vercel
3. ⏳ Add environment variables
4. ⏳ Deploy and test
5. ⏳ Update NEXTAUTH_URL with actual deployment URL
6. ⏳ Redeploy to apply URL changes

## After Deployment:

- Your website will be live at: `https://save-cute-paws.vercel.app` (or similar)
- Admin dashboard: `https://save-cute-paws.vercel.app/admin/dashboard`
- Sanity Studio: `https://save-cute-paws.vercel.app/studio`
