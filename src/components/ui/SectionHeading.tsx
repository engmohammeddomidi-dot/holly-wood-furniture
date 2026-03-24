import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  subtitle,
  center = true,
  light = false,
}) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-sm font-semibold tracking-[0.15em] uppercase mb-3"
          style={{ color: 'var(--color-brass)', fontFamily: 'var(--font-body)' }}
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight whitespace-pre-line"
        style={{ color: light ? 'var(--color-warm-white)' : 'var(--color-walnut)' }}
      >
        {title}
      </motion.h2>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="brass-line"
        style={{ transformOrigin: center ? 'center' : 'left' }}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-lg max-w-2xl leading-relaxed"
          style={{
            color: light ? 'rgba(250,248,244,0.8)' : 'var(--color-oak)',
            margin: center ? '1rem auto 0' : '1rem 0 0',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
