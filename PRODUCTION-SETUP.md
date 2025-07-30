# 🚀 Promptfolio Production Deployment Guide

## 🌐 Domain Configuration: promptfolio.alexsaulea.com

### Why Subdomain Approach?

- ✅ Clean separation from main site
- ✅ Independent SSL certificate
- ✅ Easier deployment and updates
- ✅ Better performance isolation
- ✅ Simple DNS management

## 📋 Pre-Deployment Checklist

### 1. LinkedIn Developer App Setup

```
App Name: Promptfolio AI Assistant
Website URL: https://promptfolio.alexsaulea.com
Privacy Policy: https://promptfolio.alexsaulea.com/privacy
Authorized Redirect URLs:
  - https://promptfolio.alexsaulea.com/auth/linkedin
  - https://promptfolio.alexsaulea.com/auth/callback
  - http://localhost:8082/auth/linkedin (for development)

Required Products/Permissions:
✅ Sign In with LinkedIn
✅ Share on LinkedIn
✅ Marketing Developer Platform (if available)
✅ Content Management (for company pages)
```

### 2. Environment Variables Setup

Create these in your deployment platform:

```env
# App Configuration
VITE_APP_URL=https://promptfolio.alexsaulea.com
VITE_APP_NAME=Promptfolio
VITE_APP_DESCRIPTION=AI-Powered Prompt Engineering Platform

# Supabase (Production)
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-anon-key

# LinkedIn Integration
VITE_LINKEDIN_CLIENT_ID=your-linkedin-app-client-id
VITE_LINKEDIN_CLIENT_SECRET=your-linkedin-app-client-secret
VITE_LINKEDIN_REDIRECT_URI=https://promptfolio.alexsaulea.com/auth/linkedin

# Notion Integration
VITE_NOTION_ACCESS_TOKEN=your-notion-integration-token

# Email Integration (Resend recommended)
VITE_RESEND_API_KEY=your-resend-api-key
VITE_DEFAULT_FROM_EMAIL=noreply@alexsaulea.com
```

## 🚀 Deployment Steps

### Step 1: Prepare Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for production deployment with LinkedIn integration"
git push origin main
```

### Step 2: Deploy to Vercel

1. **Go to vercel.com** and sign in
2. **Import Project** from GitHub
3. **Configure Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 3: Set Environment Variables in Vercel

1. Go to **Project Settings → Environment Variables**
2. Add all the environment variables listed above
3. Make sure to set them for **Production** environment

### Step 4: Configure Custom Domain

1. In Vercel Dashboard → **Domains**
2. Add domain: `promptfolio.alexsaulea.com`
3. Vercel will provide DNS configuration

### Step 5: Update GoDaddy DNS

1. **Login to GoDaddy DNS Management**
2. **Add CNAME Record**:

   ```
   Type: CNAME
   Name: promptfolio
   Value: cname.vercel-dns.com
   TTL: 600 seconds
   ```

3. **Wait for DNS propagation** (usually 5-30 minutes)

## 🔧 LinkedIn Developer Configuration

### Required Scopes for Full Functionality

```
r_liteprofile          # Basic profile info
r_emailaddress         # Email address
w_member_social        # Post as user
r_organization_social  # Read company info
w_organization_social  # Post as company
r_basicprofile         # Extended profile
r_1st_connections_size # Network size
```

### LinkedIn App Settings

1. **Go to LinkedIn Developer Portal**
2. **Create/Edit Your App**
3. **Products Tab**: Request access to:
   - Sign In with LinkedIn
   - Share on LinkedIn
   - Marketing Developer Platform (if available)
4. **Auth Tab**: Add redirect URLs
5. **Settings Tab**: Note Client ID and Secret

## 📊 Integration Setup Guide

### 1. LinkedIn Setup

```typescript
// Your LinkedIn app credentials
const linkedinConfig = {
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  redirectUri: "https://promptfolio.alexsaulea.com/auth/linkedin",
  scopes: [
    "r_liteprofile",
    "r_emailaddress",
    "w_member_social",
    "r_organization_social"
  ]
};
```

### 2. Notion Setup

```typescript
// Create Notion integration at https://www.notion.so/my-integrations
const notionConfig = {
  token: "secret_your-integration-token",
  version: "2022-06-28"
};
```

### 3. Email Setup (Resend)

```typescript
// Sign up at resend.com
const emailConfig = {
  apiKey: "re_your-api-key",
  fromEmail: "noreply@alexsaulea.com"
};
```

## 🧪 Testing Checklist

After deployment, test these features:

### LinkedIn Integration

- [ ] OAuth login flow
- [ ] Profile data retrieval
- [ ] Post creation
- [ ] Post scheduling
- [ ] Company page access (if applicable)

### Notion Integration

- [ ] Database connection
- [ ] Page creation
- [ ] Content templates

### Email Integration

- [ ] Email sending
- [ ] Template usage
- [ ] Scheduling

### Workflow Automation

- [ ] Create workflow from template
- [ ] Execute workflow manually
- [ ] Check integration connections

## 🔒 Security Considerations

### SSL/HTTPS

- ✅ Vercel provides automatic SSL
- ✅ Force HTTPS redirects
- ✅ HSTS headers

### API Security

- ✅ Environment variables for all secrets
- ✅ No hardcoded API keys
- ✅ Proper CORS configuration
- ✅ Rate limiting (built into integrations)

### Authentication

- ✅ Secure OAuth flows
- ✅ Token refresh handling
- ✅ Secure token storage

## 📈 Post-Deployment

### 1. Monitor Performance

- Set up Vercel Analytics
- Monitor API usage limits
- Track user engagement

### 2. Set Up Monitoring

```bash
# Optional: Add error tracking
npm install @sentry/react @sentry/tracing
```

### 3. Configure Backups

- Supabase automatic backups
- Export user workflows regularly
- Document configuration

## 🎯 Next Actions

1. **LinkedIn Developer App**: Set up redirect URLs
2. **Environment Variables**: Gather all API keys
3. **Deploy to Vercel**: Import from GitHub
4. **Configure Domain**: Add CNAME record in GoDaddy
5. **Test Integrations**: Verify all connections work

Would you like me to help you with any specific step?
