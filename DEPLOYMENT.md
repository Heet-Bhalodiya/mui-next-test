# Deployment Configuration Summary

## 🎯 Quick Start

### Local Development (No BasePath)
```bash
pnpm dev
# Visit: http://localhost:3000
```

### Local Development (With BasePath)
```bash
# Edit .env.local
NEXT_PUBLIC_BASE_PATH=/my-app

pnpm dev
# Visit: http://localhost:3000/my-app
```

## 🚀 Deployment Commands

### Production Build (Root Deployment)
```bash
pnpm build:prod
pnpm start:prod
```

### Staging Build (Subdirectory Deployment)
```bash
pnpm build:staging
pnpm start:staging
# Configured for /staging subdirectory
```

### Custom BasePath Build
```bash
NEXT_PUBLIC_BASE_PATH=/custom-path pnpm build
NEXT_PUBLIC_BASE_PATH=/custom-path pnpm start
```

## 📝 Environment Variables

### Available Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_BASE_PATH` | Application base path | `/my-app` |

### Environment Files

- `.env.local` - Local development (gitignored)
- `.env.example` - Template file (committed to git)
- `.env.production` - Production settings (create if needed)
- `.env.staging` - Staging settings (create if needed)

## 🌍 i18n + BasePath

The application supports both internationalization and basePath:

### Without BasePath
- English: `https://example.com/en`
- Spanish: `https://example.com/es`
- French: `https://example.com/fr`

### With BasePath (`/my-app`)
- English: `https://example.com/my-app/en`
- Spanish: `https://example.com/my-app/es`
- French: `https://example.com/my-app/fr`

## 📁 Project Structure

```
/private/tmp/mui-next-test
├── app/
│   └── [lang]/               # Internationalized routes
│       ├── components/       # Shared components
│       ├── header/          # Navigation
│       ├── about/           # Pages
│       └── dummy1-3/        # Example pages
├── dictionaries/            # i18n translations
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── lib/
│   └── basePath.ts          # BasePath utilities
├── .env.local               # Local environment (gitignored)
├── .env.example             # Environment template
├── i18n.ts                  # i18n configuration
├── middleware.ts            # Locale routing
├── get-dictionary.ts        # Translation loader
└── next.config.ts           # Next.js config with basePath
```

## 🔧 Configuration Files

### next.config.ts
Automatically reads `NEXT_PUBLIC_BASE_PATH` from environment.

### middleware.ts
Handles locale detection and routing (compatible with basePath).

### i18n.ts
Defines supported locales: `en`, `es`, `fr`.

## 📚 Documentation

- **BASEPATH_GUIDE.md** - Complete basePath deployment guide
- **I18N_IMPLEMENTATION.md** - Internationalization details
- **README.md** - This file

## ✅ What Works

- ✅ i18n routing (en, es, fr)
- ✅ BasePath configuration
- ✅ Static generation for all locales
- ✅ Language switcher
- ✅ SEO-friendly URLs
- ✅ Development & Production builds
- ✅ Environment-based configuration

## 🧪 Testing Checklist

- [ ] Test root deployment (`NEXT_PUBLIC_BASE_PATH=`)
- [ ] Test subdirectory deployment (`NEXT_PUBLIC_BASE_PATH=/test`)
- [ ] Test language switching on each deployment
- [ ] Verify all navigation links work
- [ ] Check static assets load correctly
- [ ] Test build and production mode

## 🎨 Customization

### Add New Locale
1. Add locale to `i18n.ts`
2. Create translation file in `dictionaries/`
3. Import in `get-dictionary.ts`

### Change BasePath
Update `.env.local` or set environment variable:
```bash
NEXT_PUBLIC_BASE_PATH=/your-path
```

### Deployment Platforms
See `BASEPATH_GUIDE.md` for platform-specific instructions:
- Vercel
- Netlify
- Docker
- GitHub Pages

---

**Need help?** Check the detailed guides:
- [BASEPATH_GUIDE.md](./BASEPATH_GUIDE.md)
- [I18N_IMPLEMENTATION.md](./I18N_IMPLEMENTATION.md)
