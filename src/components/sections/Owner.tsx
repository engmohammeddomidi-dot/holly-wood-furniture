import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { MapPin, Clock, Award } from 'lucide-react';

export const Owner: React.FC = () => {
  const { t } = useTranslation();

  const highlights = [
    { icon: Award, text: t('owner.experience') },
    { icon: MapPin, text: t('owner.location') },
    { icon: Clock, text: t('owner.specialty') },
  ];

  return (
    <section
      id="owner"
      className="section-padding"
      style={{ background: 'var(--color-warm-white)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1 flex justify-center"
          >
            {/* Background decorative shape */}
            <div
              className="absolute inset-0 rounded-2xl -rotate-3 scale-95"
              style={{ background: 'var(--color-brass)', opacity: 0.12 }}
            />
            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden w-full max-w-sm"
              style={{ boxShadow: 'var(--shadow-xl)' }}
            >
              <img
                src="/images/owner.jpg"
                alt="Muath Domidi — Master Woodworker"
                className="w-full object-cover"
                style={{ aspectRatio: '3/4', objectPosition: 'top center' }}
              />
              {/* Overlay badge */}
              <div
                className="absolute bottom-0 inset-x-0 p-5"
                style={{
                  background: 'linear-gradient(to top, rgba(61,58,42,0.92) 0%, rgba(61,58,42,0.4) 70%, transparent 100%)',
                }}
              >
                <p
                  className="text-lg font-bold leading-tight"
                  style={{ color: 'var(--color-warm-white)', fontFamily: 'var(--font-display)' }}
                >
                  معاذ ضميدي
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-brass)' }}
                >
                  Muath Domidi
                </p>
              </div>
            </div>

            {/* Floating tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -top-4 -end-4 px-4 py-2 rounded-xl text-center"
              style={{
                background: 'var(--color-forest)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <span className="block text-2xl font-bold" style={{ color: 'var(--color-warm-white)', fontFamily: 'var(--font-display)' }}>13+</span>
              <span className="block text-xs" style={{ color: 'rgba(245,241,232,0.8)' }}>Years</span>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              label={t('owner.label')}
              title={t('owner.title')}
              subtitle={t('owner.subtitle')}
              center={false}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 leading-relaxed"
              style={{ color: 'var(--color-oak)' }}
            >
              {t('owner.p1')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="leading-relaxed mb-8"
              style={{ color: 'var(--color-oak)' }}
            >
              {t('owner.p2')}
            </motion.p>

            {/* Highlights */}
            <div className="space-y-3">
              {highlights.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-cream)' }}
                  >
                    <Icon size={17} style={{ color: 'var(--color-brass)' }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-walnut)' }}>
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
