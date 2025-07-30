# 🔧 Environment Setup Instructions

## Local Development (.env.local)

Create a `.env.local` file in your project root with these variables:

```env
# Development URLs
VITE_APP_URL=http://localhost:8082
VITE_APP_NAME=Promptfolio
VITE_APP_DESCRIPTION=AI-Powered Prompt Engineering Platform

# Supabase (you can use the same for dev/prod or create separate projects)
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# LinkedIn Developer App
VITE_LINKEDIN_CLIENT_ID=your-linkedin-client-id
VITE_LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
VITE_LINKEDIN_REDIRECT_URI=http://localhost:8082/auth/linkedin

# Notion Integration
VITE_NOTION_ACCESS_TOKEN=secret_your-notion-integration-token

# Email Service (Resend recommended)
VITE_RESEND_API_KEY=re_your-resend-api-key
VITE_DEFAULT_FROM_EMAIL=noreply@alexsaulea.com
```

## Production Environment (Vercel/Netlify)

Set these in your deployment platform's environment variables section:

```env
# Production URLs
VITE_APP_URL=https://promptfolio.alexsaulea.com
VITE_APP_NAME=Promptfolio
VITE_APP_DESCRIPTION=AI-Powered Prompt Engineering Platform

# Supabase Production
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-supabase-anon-key

# LinkedIn Production
VITE_LINKEDIN_CLIENT_ID=your-linkedin-client-id
VITE_LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
VITE_LINKEDIN_REDIRECT_URI=https://promptfolio.alexsaulea.com/auth/linkedin

# Notion Production
VITE_NOTION_ACCESS_TOKEN=secret_your-notion-integration-token

# Email Production
VITE_RESEND_API_KEY=re_your-resend-api-key
VITE_DEFAULT_FROM_EMAIL=noreply@alexsaulea.com
```

## 🔗 Quick Setup Links

### LinkedIn Developer App

1. Go to: <https://developer.linkedin.com/apps>
2. Create new app or use existing
3. Add redirect URLs:
   - Development: `http://localhost:8082/auth/linkedin`
   - Production: `https://promptfolio.alexsaulea.com/auth/linkedin`
4. Copy Client ID and Client Secret

### Notion Integration

1. Go to: <https://www.notion.so/my-integrations>
2. Create new integration
3. Copy the Internal Integration Token
4. Share your databases with the integration

### Resend Email Service

1. Go to: <https://resend.com>
2. Sign up for free account
3. Create API key
4. Verify your domain (alexsaulea.com) for better deliverability

### Supabase Setup

1. Go to: <https://supabase.com>
2. Create new project
3. Copy Project URL and anon key
4. Set up authentication if needed

## 🧪 Testing Your Setup

After adding environment variables:

1. Restart your development server
2. Go to the "Integrations" tab in Promptfolio
3. Check connection status for each service
4. Run individual tests for each integration
5. Verify environment variables are detected

## 🚀 Ready for Deployment

Once all integrations show as connected:

1. Push your code to GitHub
2. Deploy to Vercel with the production environment variables
3. Configure your domain (promptfolio.alexsaulea.com)
4. Test the production deployment

## 📋 Pre-Deployment Checklist

- [ ] LinkedIn app configured with production redirect URL
- [ ] Notion integration created and databases shared
- [ ] Resend account set up with domain verification
- [ ] Supabase project configured
- [ ] All environment variables added to deployment platform
- [ ] Domain DNS configured (CNAME record)
- [ ] SSL certificate active (automatic with Vercel)

Your Promptfolio is ready to go live with full LinkedIn, Notion, and Email automation! 🎉
