import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

interface LocalizedProps {
  i18nKey: string;
  values?: Record<string, string | number>;
  children?: ReactNode;
}

/**
 * Component to handle text translations using i18next
 * Use this component when you need translated text in your components
 * 
 * Example:
 * <Localized i18nKey="auth.welcome" />
 * <Localized i18nKey="common.greeting" values={{ name: 'John' }}>Default text</Localized>
 */
export default function Localized({ i18nKey, values, children }: LocalizedProps) {
  const t = useTranslations();

  try {
    return <>{t(i18nKey, values)}</>;
  } catch (error) {
    // Fallback to children if provided or to the key itself
    return <>{children || i18nKey}</>;
  }
}
