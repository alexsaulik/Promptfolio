# Promptfolio Deployment Guide

## 🚀 Hosting Options for alexsaulea.com

### Option 1: Subdomain (Recommended)

**URL**: `promptfolio.alexsaulea.com`

#### Vercel Deployment (Easiest)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy to Vercel
vercel

# 3. Set custom domain in Vercel dashboard
# Domain: promptfolio.alexsaulea.com
```

#### GoDaddy DNS Configuration

```
Type: CNAME
Name: promptfolio
Value: your-vercel-app.vercel.app
TTL: 600
```

### Option 2: Netlify Deployment

```bash
# 1. Build the project
npm run build

# 2. Deploy to Netlify
# Upload dist/ folder to Netlify
# Or connect Git repository

# 3. Set custom domain
# Domain: promptfolio.alexsaulea.com
```

### Option 3: Traditional Hosting (cPanel/Shared Hosting)

```bash
# 1. Build the project
npm run build

# 2. Upload dist/ folder contents to subdomain folder
# Create subdomain in cPanel: promptfolio.alexsaulea.com
# Upload files to /public_html/promptfolio/ or subdomain folder

# 3. Configure .htaccess for SPA routing
```

## 🔐 Authentication Strategy

### Option 1: Supabase Auth (Current - Recommended)

- **Pros**: Already integrated, handles OAuth, secure
- **Setup**: Configure Supabase URL in production
- **Custom Domain**: Works with any domain

### Option 2: Auth0 Integration

```typescript
// Install Auth0
npm install @auth0/auth0-react

// Configure Auth0
const domain = "your-domain.auth0.com";
const clientId = "your-client-id";
```

### Option 3: Firebase Auth

```typescript
// Install Firebase
npm install firebase

// Configure Firebase
const firebaseConfig = {
  authDomain: "your-app.firebaseapp.com",
  // ... other config
};
```

## 🌐 Domain Configuration

### GoDaddy DNS Records for Subdomain

1. **Login to GoDaddy DNS Management**
2. **Add CNAME Record**:

   ```
   Type: CNAME
   Name: promptfolio (or app)
   Value: your-deployment-url.vercel.app
   TTL: 600 seconds
   ```

### For Root Domain Integration

1. **A Record** (if using traditional hosting):

   ```
   Type: A
   Name: @
   Value: Your-Server-IP
   ```

2. **Or ALIAS/ANAME** (for Vercel/Netlify):

   ```
   Type: ALIAS
   Name: @
   Value: your-app.vercel.app
   ```

## 📁 File Structure for Production

```
your-domain-folder/
├── promptfolio/          # Subdirectory approach
│   ├── index.html
│   ├── assets/
│   └── ...
├── main-site/           # Your existing site
│   ├── index.html
│   └── ...
└── .htaccess           # Root redirects
```

## 🔧 Environment Configuration

### Production Environment Variables

```env
# API Keys (add to Vercel/Netlify environment variables)
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-anon-key

# Integration APIs
VITE_LINKEDIN_CLIENT_ID=your-linkedin-client-id
VITE_LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
VITE_LINKEDIN_REDIRECT_URI=https://promptfolio.alexsaulea.com/auth/linkedin

VITE_NOTION_ACCESS_TOKEN=your-notion-integration-token
VITE_RESEND_API_KEY=your-resend-api-key
VITE_DEFAULT_FROM_EMAIL=noreply@alexsaulea.com
```

## 🚀 Deployment Steps

### Quick Vercel Deployment

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Visit vercel.com
   - Import your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist`

3. **Configure Custom Domain**:
   - In Vercel dashboard → Settings → Domains
   - Add: `promptfolio.alexsaulea.com`
   - Update GoDaddy DNS as instructed

4. **Set Environment Variables**:
   - In Vercel dashboard → Settings → Environment Variables
   - Add all VITE_ variables

### Alternative: Traditional Hosting

1. **Build locally**:

   ```bash
   npm run build
   ```

2. **Upload to hosting**:
   - Create subdomain in cPanel
   - Upload `dist/` contents to subdomain folder
   - Add `.htaccess` for SPA routing:

   ```apache
   RewriteEngine On
   RewriteRule ^(?!.*\.).*$ /index.html [L]
   ```

## 🔒 Security Considerations

### SSL Certificate

- **Vercel/Netlify**: Automatic SSL
- **Traditional hosting**: Enable SSL in cPanel
- **Custom**: Use Let's Encrypt

### API Security

- Use environment variables for all API keys
- Configure CORS for your domain
- Set up proper Supabase RLS policies

### Authentication Redirect URLs

Update all OAuth redirect URLs to production domain:

- LinkedIn: `https://promptfolio.alexsaulea.com/auth/linkedin`
- Supabase: `https://promptfolio.alexsaulea.com/auth/callback`

## 📊 Monitoring & Analytics

### Add Google Analytics

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance Monitoring

- Use Vercel Analytics
- Or integrate Sentry for error tracking

## 🎯 Recommended Approach

**For alexsaulea.com hosting, I recommend:**

1. **Subdomain deployment**: `promptfolio.alexsaulea.com`
2. **Vercel hosting**: Easiest setup, great performance
3. **Supabase Auth**: Already integrated, production-ready
4. **GoDaddy DNS**: Simple CNAME record

**Next Steps:**

1. Push code to GitHub
2. Connect to Vercel
3. Configure custom domain
4. Set environment variables
5. Update OAuth redirect URLs

Would you like me to help you set up any of these deployment options?
