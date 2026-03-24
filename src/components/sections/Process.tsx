import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { MessageSquare, Layers, Hammer, Truck } from 'lucide-react';

const STEPS = [
  { key: 'consultation', icon: MessageSquare, num: '01' },
  { key: 'materials', icon: Layers, num: '02' },
  { key: 'crafting', icon: Hammer, num: '03' },
  { key: 'delivery', icon: Truck, num: '04' },
];

export const Process: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="process"
      className="section-padding wood-texture"
      style={{ background: 'var(--color-walnut)', position: 'relative' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('process.label')}
          title={t('process.title')}
          subtitle={t('process.subtitle')}
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 start-[12.5%] end-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--color-brass), transparent)' }}
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5 border-2"
                  style={{
                    background: 'rgba(184,134,11,0.15)',
                    borderColor: 'var(--color-brass)',
                  }}
                >
                  <Icon size={28} style={{ color: 'var(--color-brass)' }} />
                </div>
                <span
                  className="absolute top-0 end-6 text-5xl font-bold opacity-10 select-none"
                  style={{ color: 'var(--color-warm-white)', fontFamily: 'var(--font-display)' }}
                >
                  {step.num}
                </span>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--color-warm-white)', fontFamily: 'var(--font-display)' }}
                >
                  {t(`process.steps.${step.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(250,248,244,0.65)' }}>
                  {t(`process.steps.${step.key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
