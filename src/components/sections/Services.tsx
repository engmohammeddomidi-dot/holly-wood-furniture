import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Sofa, CookingPot, Wrench, Home, Trees, Building2 } from 'lucide-react';

const SERVICES = [
  { key: 'custom', icon: Sofa },
  { key: 'kitchen', icon: CookingPot },
  { key: 'restoration', icon: Wrench },
  { key: 'interior', icon: Home },
  { key: 'outdoor', icon: Trees },
  { key: 'commercial', icon: Building2 },
];

export const Services: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="section-padding" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('services.label')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
                className="group p-6 rounded-lg transition-all duration-300 cursor-default"
                style={{
                  background: 'var(--color-warm-white)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-sand)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-[var(--color-brass)]"
                  style={{ background: 'var(--color-sand)' }}
                >
                  <Icon
                    size={22}
                    className="transition-colors duration-300 group-hover:text-white"
                    style={{ color: 'var(--color-brass)' }}
                  />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--color-walnut)', fontFamily: 'var(--font-display)' }}
                >
                  {t(`services.items.${service.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-oak)' }}>
                  {t(`services.items.${service.key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
