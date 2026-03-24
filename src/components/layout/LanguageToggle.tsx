import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const LanguageToggle: React.FC<{ light?: boolean }> = ({ light = false }) => {
  const { i18n, t } = useTranslation();
  const isAr = i18n.language === 'ar';

  const toggle = () => i18n.changeLanguage(isAr ? 'en' : 'ar');

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-3 py-1.5 rounded border text-sm font-medium tracking-wide transition-all duration-200"
      style={{
        borderColor: light ? 'rgba(250,248,244,0.4)' : 'var(--color-brass)',
        color: light ? 'var(--color-warm-white)' : 'var(--color-brass)',
        fontFamily: isAr ? 'var(--font-body)' : 'var(--font-body-ar)',
      }}
      aria-label="Switch language"
    >
      {t('nav.switchLang')}
    </motion.button>
  );
};
