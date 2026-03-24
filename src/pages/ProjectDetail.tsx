import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useProject } from '../hooks/useProjects';
import { ArrowLeft } from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const { project, loading } = useProject(slug!);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const isAr = i18n.language === 'ar';

  if (loading) {
    return (
      <main className="pt-24 min-h-screen" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="h-96 rounded-lg animate-pulse" style={{ background: 'var(--color-sand)' }} />
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center" style={{ background: 'var(--color-cream)' }}>
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: 'var(--color-oak)' }}>Project not found.</p>
          <Link to="/portfolio" className="text-sm font-medium" style={{ color: 'var(--color-brass)' }}>
            {t('portfolio.backToPortfolio')}
          </Link>
        </div>
      </main>
    );
  }

  const images = (project.media || []).filter((m) => m.media_type === 'image');
  const lightboxSlides = images.map((m) => ({ src: m.media_url }));

  return (
    <main className="pt-24 min-h-screen" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors hover:text-[var(--color-brass)]"
          style={{ color: 'var(--color-oak)' }}
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t('portfolio.backToPortfolio')}
        </Link>

        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-xl overflow-hidden mb-8"
          style={{ boxShadow: 'var(--shadow-xl)' }}
        >
          <img
            src={project.cover_image}
            alt={isAr ? project.title_ar : project.title_en}
            className="w-full h-64 sm:h-96 object-cover"
          />
          {project.category && (
            <span
              className="absolute top-5 start-5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: 'var(--color-brass)', color: 'var(--color-warm-white)' }}
            >
              {t(`portfolio.categories.${project.category}` as any, project.category)}
            </span>
          )}
        </motion.div>

        {/* Title & Description */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-10">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: 'var(--color-walnut)', fontFamily: 'var(--font-display)' }}
          >
            {isAr ? project.title_ar : project.title_en}
          </h1>
          {(isAr ? project.description_ar : project.description_en) && (
            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-oak)' }}>
              {isAr ? project.description_ar : project.description_en}
            </p>
          )}
        </motion.div>

        {/* Media Gallery */}
        {images.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-5" style={{ color: 'var(--color-walnut)', fontFamily: 'var(--font-display)' }}>
              Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((media, i) => (
                <motion.div
                  key={media.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="cursor-pointer overflow-hidden rounded-lg group"
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                  onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                >
                  <img
                    src={media.media_url}
                    alt={isAr ? media.caption_ar || '' : media.caption_en || ''}
                    className="w-full h-40 object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Video media */}
        {(project.media || []).filter((m) => m.media_type === 'video').map((v) => (
          <div key={v.id} className="mt-6 rounded-lg overflow-hidden" style={{ boxShadow: 'var(--shadow-md)' }}>
            <video src={v.media_url} controls className="w-full" />
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
      />
    </main>
  );
};
