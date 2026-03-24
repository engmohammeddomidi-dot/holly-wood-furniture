import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';

const stats = [
  { value: '13+', key: 'about.stats.years' },
  { value: '500+', key: 'about.stats.projects' },
  { value: '100%', key: 'about.stats.handcrafted' },
];

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--color-warm-white)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-lg overflow-hidden" style={{ boxShadow: 'var(--shadow-xl)' }}>
              <img
                src="https://images.unsplash.com/photo-1601598851547-4302969d0614?w=800&q=80"
                alt="Master craftsman at work"
                className="w-full h-80 lg:h-[520px] object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(62,39,35,0.1) 0%, transparent 60%)' }}
              />
            </div>
            {/* Decorative frame */}
            <div
              className="absolute -bottom-4 -end-4 w-32 h-32 rounded-lg -z-10"
              style={{ background: 'var(--color-brass)', opacity: 0.2 }}
            />
          </motion.div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              label={t('about.label')}
              title={t('about.title')}
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
              {t('about.p1')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="leading-relaxed"
              style={{ color: 'var(--color-oak)' }}
            >
              {t('about.p2')}
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="text-center p-4 rounded-lg"
                  style={{ background: 'var(--color-cream)' }}
                >
                  <div
                    className="text-2xl sm:text-3xl font-bold mb-1"
                    style={{ color: 'var(--color-brass)', fontFamily: 'var(--font-display)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm" style={{ color: 'var(--color-oak)' }}>
                    {t(stat.key)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
