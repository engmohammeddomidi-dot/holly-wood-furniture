import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const isRTL = i18n.language === 'ar';

  const items = t('testimonials.items', { returnObjects: true }) as Array<{
    quote: string;
    author: string;
    project: string;
  }>;

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{ background: 'var(--color-cream)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('testimonials.label')}
          title={t('testimonials.title')}
        />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 30 : -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl p-8 sm:p-12 text-center relative"
              style={{
                background: 'var(--color-warm-white)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-sand)',
              }}
            >
              <Quote
                size={36}
                className="mx-auto mb-6 opacity-20"
                style={{ color: 'var(--color-brass)' }}
              />
              <div className="flex justify-center gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--color-brass)" style={{ color: 'var(--color-brass)' }} />
                ))}
              </div>
              <blockquote
                className="text-lg sm:text-xl leading-relaxed mb-6 italic"
                style={{ color: 'var(--color-walnut)' }}
              >
                "{items[current]?.quote}"
              </blockquote>
              <div>
                <p className="font-semibold" style={{ color: 'var(--color-walnut)', fontFamily: 'var(--font-display)' }}>
                  {items[current]?.author}
                </p>
                <p className="text-sm mt-0.5" style={{ color: 'var(--color-brass)' }}>
                  {items[current]?.project}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={isRTL ? next : prev}
            className="absolute top-1/2 -translate-y-1/2 -start-5 sm:-start-8 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'var(--color-warm-white)', boxShadow: 'var(--shadow-md)', color: 'var(--color-walnut)', border: '1px solid var(--color-sand)' }}
            aria-label="Previous"
          >
            <ChevronLeft size={18} className="rtl:rotate-180" />
          </button>
          <button
            onClick={isRTL ? prev : next}
            className="absolute top-1/2 -translate-y-1/2 -end-5 sm:-end-8 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'var(--color-warm-white)', boxShadow: 'var(--shadow-md)', color: 'var(--color-walnut)', border: '1px solid var(--color-sand)' }}
            aria-label="Next"
          >
            <ChevronRight size={18} className="rtl:rotate-180" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-2.5 h-2.5 rounded-full transition-all duration-200"
              style={{
                background: i === current ? 'var(--color-brass)' : 'var(--color-sand)',
                transform: i === current ? 'scale(1.3)' : 'scale(1)',
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
