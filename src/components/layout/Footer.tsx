import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

const NAV_LINKS = [
  { key: 'nav.home', href: '/#home' },
  { key: 'nav.about', href: '/#about' },
  { key: 'nav.services', href: '/#services' },
  { key: 'nav.portfolio', href: '/portfolio' },
  { key: 'nav.contact', href: '/#contact' },
];

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer style={{ background: 'var(--color-charcoal)', color: 'rgba(250,248,244,0.75)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.jpg"
                alt="Hollywood Furniture Logo"
                className="w-12 h-12 object-contain rounded"
                style={{ background: 'var(--color-warm-white)', padding: '2px' }}
              />
              <span
                className="text-lg font-semibold leading-tight"
                style={{ color: 'var(--color-warm-white)', fontFamily: 'var(--font-display)' }}
              >
                Hollywood<br />Furniture
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5">{t('footer.tagline')}</p>
            <LanguageToggle light />
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: 'var(--color-brass)' }}
            >
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-[var(--color-honey)]"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: 'var(--color-brass)' }}
            >
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--color-honey)' }} />
                {t('contact.info.address')}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} style={{ color: 'var(--color-honey)' }} />
                <a href={`tel:${t('contact.info.phone')}`} className="hover:text-[var(--color-honey)] transition-colors">
                  {t('contact.info.phone')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} style={{ color: 'var(--color-honey)' }} />
                <a href={`mailto:${t('contact.info.email')}`} className="hover:text-[var(--color-honey)] transition-colors">
                  {t('contact.info.email')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={15} style={{ color: 'var(--color-honey)' }} />
                {t('contact.info.hours')}
              </li>
            </ul>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a href="#" className="p-2 rounded-full border border-white/20 hover:border-[var(--color-honey)] hover:text-[var(--color-honey)] transition-all text-sm font-bold" aria-label="Instagram">
                IG
              </a>
              <a href="#" className="p-2 rounded-full border border-white/20 hover:border-[var(--color-honey)] hover:text-[var(--color-honey)] transition-all text-sm font-bold" aria-label="Facebook">
                FB
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: '1px solid rgba(250,248,244,0.1)' }}
        >
          <span>{t('footer.copyright')}</span>
          <span style={{ color: 'var(--color-honey)' }}>{t('footer.madeWith')}</span>
        </div>
      </div>
    </footer>
  );
};
