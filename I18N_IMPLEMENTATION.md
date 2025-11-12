# i18n Implementation - Next.js App Router

This project implements internationalization (i18n) following the official Next.js App Router documentation.

## 🌍 Supported Locales

- **en** - English (default)
- **es** - Spanish
- **fr** - French

## 📁 Project Structure

```
/private/tmp/mui-next-test
├── app/
│   ├── [lang]/                    # Dynamic locale segment
│   │   ├── about/                 # About page
│   │   ├── components/            # Shared components
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── dummy1-3/              # Demo pages
│   │   ├── header/                # Header component
│   │   ├── layout.tsx             # Root layout with locale
│   │   └── page.tsx               # Home page
│   ├── globals.css
│   └── favicon.ico
├── dictionaries/                   # Translation files
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts                        # i18n configuration
├── middleware.ts                  # Locale detection & routing
└── get-dictionary.ts              # Dictionary loader
```

## 🔧 Implementation Details

### 1. **i18n Configuration** (`i18n.ts`)
Defines supported locales and default locale:
```typescript
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr'],
} as const
```

### 2. **Middleware** (`middleware.ts`)
- Detects user's preferred language from `Accept-Language` header
- Automatically redirects to appropriate locale (e.g., `/` → `/en`)
- Uses `@formatjs/intl-localematcher` and `negotiator` for locale matching

### 3. **Dictionary System**
- Translation files stored in `/dictionaries/*.json`
- Server-side loading with `getDictionary()` function
- Type-safe locale parameter

### 4. **Routing Structure**
All pages are nested under `app/[lang]/`:
- `/en` - English homepage
- `/es` - Spanish homepage  
- `/fr` - French homepage
- `/en/about` - English about page
- etc.

### 5. **Static Generation**
The layout includes `generateStaticParams()` to pre-render all locale versions:
```typescript
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}
```

## 🚀 Usage

### Running the Development Server
```bash
pnpm dev
```

Visit:
- `http://localhost:3000` - Auto-redirects to your browser's preferred language
- `http://localhost:3000/en` - English
- `http://localhost:3000/es` - Spanish
- `http://localhost:3000/fr` - French

### Language Switcher
The header includes a language switcher component that allows users to toggle between locales while maintaining their current page path.

## 📝 Adding New Translations

1. **Add to dictionary files:**
   ```json
   // dictionaries/en.json
   {
     "newSection": {
       "key": "English text"
     }
   }
   ```

2. **Use in components:**
   ```typescript
   const dict = await getDictionary(lang);
   return <h1>{dict.newSection.key}</h1>
   ```

## 🎯 Key Features

✅ Automatic locale detection from browser preferences  
✅ URL-based locale routing (`/en`, `/es`, `/fr`)  
✅ Server-side translation loading (no bundle bloat)  
✅ Type-safe locale parameters  
✅ Static generation support  
✅ Language switcher component  
✅ SEO-friendly with proper `lang` attribute  

## 📦 Dependencies

```json
{
  "@formatjs/intl-localematcher": "^0.6.2",
  "negotiator": "^1.0.0",
  "server-only": "^0.0.1"
}
```

## 🔗 References

- [Next.js Internationalization Guide](https://nextjs.org/docs/app/guides/internationalization)
- Implementation follows official Next.js App Router patterns
- Uses recommended middleware approach for locale detection

---

**Note:** The middleware shows a deprecation warning about using "proxy" instead, but the current Next.js documentation (as of v16.0.1) still recommends middleware for i18n implementation.
