# Project Internationalization

This project uses i18next for internationalization with automated translation capabilities using MyMemory translation service.

## Workflow

### 1. Extract Translatable Strings

Use i18next-scanner to automatically extract translatable strings from your code:

```bash
pnpm run scan
```

This will scan your codebase for translatable strings and update your translation files in the `messages` directory.

### 2. Automatically Translate Missing Strings

To translate missing strings using the MyMemory service:

```bash
pnpm run translate
```

This will add translations for all missing strings in your target languages (currently French and Spanish).

## Using Translations in Your Code

### Option 1: Using the useTranslations Hook

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();

  return <h1>{t('auth.welcome')}</h1>;
}
```

### Option 2: Using the Localized Component

```tsx
import Localized from '@/components/Localized';

export default function MyComponent() {
  return (
    <div>
      <h1><Localized i18nKey="auth.welcome" /></h1>
      <p><Localized i18nKey="auth.greeting" values={{ name: 'User' }} /></p>
    </div>
  );
}
```

## Configuration

- Update the target languages in `scripts/generate-translations.ts`
- Configure scanning options in `i18n-scanner.config.js`
- For higher translation limits, add your email in `scripts/generate-translations.ts`

## Tips

- Always use a consistent key structure like `section.subsection.element`
- Add context comments for translators if a string has multiple meanings
- Run scans regularly as you develop new features
