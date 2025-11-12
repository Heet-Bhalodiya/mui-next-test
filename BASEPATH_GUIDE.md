# BasePath Configuration Guide

This guide explains how to configure and deploy the application with a custom basePath.

## 📋 Overview

The basePath feature allows you to deploy your Next.js application under a subdirectory instead of the domain root. For example:
- Root deployment: `https://example.com/`
- Subdirectory deployment: `https://example.com/my-app/`

## 🔧 Configuration

### 1. Environment Variables

Create or edit `.env.local` file:

```bash
# For root deployment (default)
NEXT_PUBLIC_BASE_PATH=

# For subdirectory deployment
NEXT_PUBLIC_BASE_PATH=/my-app
```

### 2. Next.js Configuration

The `next.config.ts` is already configured to read the basePath from environment variables:

```typescript
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  basePath: basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};
```

## 🚀 Deployment Scenarios

### Scenario 1: Root Deployment (Default)

**Setup:**
```bash
# .env.local or .env.production
NEXT_PUBLIC_BASE_PATH=
```

**URLs:**
- Homepage: `https://yourdomain.com/en`
- About: `https://yourdomain.com/en/about`

### Scenario 2: Subdirectory Deployment

**Setup:**
```bash
# .env.local or .env.production
NEXT_PUBLIC_BASE_PATH=/my-app
```

**URLs:**
- Homepage: `https://yourdomain.com/my-app/en`
- About: `https://yourdomain.com/my-app/en/about`

### Scenario 3: Multiple Environments

You can create different environment files:

**.env.development** (local development)
```bash
NEXT_PUBLIC_BASE_PATH=
```

**.env.production** (production)
```bash
NEXT_PUBLIC_BASE_PATH=/production-app
```

**.env.staging** (staging)
```bash
NEXT_PUBLIC_BASE_PATH=/staging-app
```

## 📦 Build & Deploy

### Local Build

```bash
# Build with current .env.local settings
pnpm build

# Start production server
pnpm start
```

### Production Build with Custom BasePath

```bash
# Option 1: Using environment file
echo "NEXT_PUBLIC_BASE_PATH=/my-app" > .env.production
pnpm build
pnpm start

# Option 2: Inline environment variable
NEXT_PUBLIC_BASE_PATH=/my-app pnpm build
NEXT_PUBLIC_BASE_PATH=/my-app pnpm start
```

## 🌐 Deployment Platforms

### Vercel

Add environment variable in Vercel dashboard:
- Variable: `NEXT_PUBLIC_BASE_PATH`
- Value: `/your-subdirectory`

### Netlify

In `netlify.toml`:
```toml
[build.environment]
  NEXT_PUBLIC_BASE_PATH = "/your-subdirectory"
```

### Docker

In your Dockerfile or docker-compose.yml:
```yaml
environment:
  - NEXT_PUBLIC_BASE_PATH=/your-subdirectory
```

### Static Export (GitHub Pages)

For GitHub Pages deployment to `username.github.io/repo-name`:

```bash
# .env.production
NEXT_PUBLIC_BASE_PATH=/repo-name
```

## 🔗 How It Works

### Automatic Handling

Next.js automatically handles basePath for:
- ✅ `<Link>` component
- ✅ `<Image>` component  
- ✅ `router.push()` and `router.replace()`
- ✅ Static assets in `/public`
- ✅ API routes

### Manual Handling (if needed)

For custom cases, use the utility function:

```typescript
import { withBasePath } from '@/lib/basePath'

// Add basePath to a custom URL
const customUrl = withBasePath('/api/data')
```

## ✅ What's Already Configured

1. **next.config.ts** - Reads basePath from environment
2. **lib/basePath.ts** - Utility functions for basePath
3. **All Links** - Use Next.js Link component (automatic basePath)
4. **Language Switcher** - Updated to work with basePath
5. **Middleware** - Compatible with basePath
6. **.env.example** - Template for environment variables

## 🧪 Testing

### Test Root Deployment
```bash
# Clear basePath
echo "NEXT_PUBLIC_BASE_PATH=" > .env.local
pnpm dev
# Visit: http://localhost:3000
```

### Test Subdirectory Deployment
```bash
# Set basePath
echo "NEXT_PUBLIC_BASE_PATH=/test-app" > .env.local
pnpm dev
# Visit: http://localhost:3000/test-app
```

## ⚠️ Important Notes

1. **BasePath Format:**
   - Must start with `/`
   - Must NOT end with `/`
   - Valid: `/my-app`, `/prod/v1`
   - Invalid: `my-app`, `/my-app/`, `https://example.com/my-app`

2. **Static Files:**
   - Files in `/public` are automatically served with basePath
   - No need to manually prefix static file paths

3. **API Routes:**
   - API routes automatically work with basePath
   - Example: `/api/hello` → `/my-app/api/hello`

4. **External Links:**
   - Use regular `<a>` tags for external links
   - Only use Next.js `<Link>` for internal navigation

## 🔍 Troubleshooting

### Issue: 404 errors after setting basePath

**Solution:** Make sure all internal links use Next.js `<Link>` component, not `<a>` tags.

### Issue: Assets not loading

**Solution:** Verify assets are in `/public` folder and referenced without basePath prefix.

### Issue: API routes not working

**Solution:** Ensure you're using the correct Next.js API route structure.

---

For more information, visit [Next.js basePath documentation](https://nextjs.org/docs/app/api-reference/next-config-js/basePath).
