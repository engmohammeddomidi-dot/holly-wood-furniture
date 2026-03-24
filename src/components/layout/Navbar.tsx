import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

const NAV_LINKS = [
  { key: 'nav.home', href: '/#home' },
  { key: 'nav.about', href: '/#about' },
  { key: 'nav.services', href: '/#services' },
  { key: 'nav.portfolio', href: '/portfolio' },
  { key: 'nav.contact', href: '/#contact' },
];

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = location.pathname === '/';
  const solid = scrolled || !isHome;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-40 transition-all duration-300"
      style={{
        background: solid ? 'var(--color-charcoal)' : 'transparent',
        boxShadow: solid ? 'var(--shadow-md)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/images/logo.jpg"
            alt="Hollywood Furniture Logo"
            className="w-10 h-10 object-contain rounded"
            style={{ background: 'var(--color-warm-white)' }}
          />
          <span
            className="text-base md:text-lg font-semibold leading-tight hidden sm:block"
            style={{ color: 'var(--color-warm-white)', fontFamily: 'var(--font-display)' }}
          >
            Hollywood Furniture
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200 hover:text-[var(--color-honey)]"
              style={{ color: 'rgba(250,248,244,0.85)' }}
            >
              {t(link.key)}
            </a>
          ))}
          <LanguageToggle light />
        </nav>

        {/* Mobile: lang toggle + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <LanguageToggle light />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded"
            style={{ color: 'var(--color-warm-white)' }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'var(--color-charcoal)' }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 text-sm font-medium border-b border-white/5 hover:text-[var(--color-honey)] transition-colors"
                style={{ color: 'rgba(250,248,244,0.85)' }}
              >
                {t(link.key)}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
