import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { useProjects } from '../../hooks/useProjects';
import { ArrowRight } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { projects, loading } = useProjects({ limit: 6 });
  const isAr = i18n.language === 'ar';

  return (
    <section id="portfolio" className="section-padding" style={{ background: 'var(--color-warm-white)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('portfolio.label')}
          title={t('portfolio.title')}
          subtitle={t('portfolio.subtitle')}
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-lg animate-pulse"
                style={{ background: 'var(--color-sand)' }}
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16" style={{ color: 'var(--color-oak)' }}>
            {t('portfolio.noProjects')}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link to={`/portfolio/${project.slug}`} className="group block relative overflow-hidden rounded-lg" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <div className="overflow-hidden h-64">
                    <img
                      src={project.cover_image}
                      alt={isAr ? project.title_ar : project.title_en}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, rgba(44,36,32,0.9) 0%, rgba(44,36,32,0.3) 50%, transparent 100%)',
                    }}
                  >
                    {project.category && (
                      <span
                        className="text-xs font-semibold tracking-wider uppercase mb-1.5 px-2 py-0.5 rounded-full self-start"
                        style={{ background: 'var(--color-brass)', color: 'var(--color-warm-white)' }}
                      >
                        {t(`portfolio.categories.${project.category}` as any, project.category)}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--color-warm-white)', fontFamily: 'var(--font-display)' }}>
                      {isAr ? project.title_ar : project.title_en}
                    </h3>
                    <span
                      className="flex items-center gap-1 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: 'var(--color-honey)' }}
                    >
                      {t('portfolio.viewProject')}
                      <ArrowRight size={14} className="rtl:rotate-180" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/portfolio">
            <Button variant="secondary" size="lg">{t('portfolio.viewAll')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
