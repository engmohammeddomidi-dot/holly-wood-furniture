import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = ['all', 'custom-furniture', 'kitchen-cabinets', 'restoration', 'interior-woodwork', 'outdoor-furniture', 'commercial'];

export const PortfolioPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState('all');
  const isAr = i18n.language === 'ar';

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="pt-24 min-h-screen" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          label={t('portfolio.label')}
          title={t('portfolio.title')}
          subtitle={t('portfolio.subtitle')}
        />

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: filter === cat ? 'var(--color-brass)' : 'var(--color-warm-white)',
                color: filter === cat ? 'var(--color-warm-white)' : 'var(--color-oak)',
                border: '1px solid',
                borderColor: filter === cat ? 'var(--color-brass)' : 'var(--color-sand)',
              }}
            >
              {t(`portfolio.categories.${cat}` as any)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-72 rounded-lg animate-pulse" style={{ background: 'var(--color-sand)' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center py-20" style={{ color: 'var(--color-oak)' }}>{t('portfolio.noProjects')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                layout
              >
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="group block relative overflow-hidden rounded-lg"
                  style={{ boxShadow: 'var(--shadow-md)' }}
                >
                  <div className="overflow-hidden h-72">
                    <img
                      src={project.cover_image}
                      alt={isAr ? project.title_ar : project.title_en}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-5"
                    style={{ background: 'linear-gradient(to top, rgba(44,36,32,0.88) 0%, rgba(44,36,32,0.2) 55%, transparent 100%)' }}
                  >
                    {project.category && (
                      <span
                        className="text-xs font-semibold uppercase tracking-wider mb-1.5 px-2 py-0.5 rounded-full self-start"
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
      </div>
    </main>
  );
};
