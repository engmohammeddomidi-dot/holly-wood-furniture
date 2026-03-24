import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, LogOut, Eye, EyeOff, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useAllProjects } from '../hooks/useProjects';
import { supabase } from '../lib/supabase';
import { signOut } from '../lib/auth';

export const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { projects, loading, refetch } = useAllProjects();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await supabase.from('projects').delete().eq('id', deleteId);
    setDeleteId(null);
    setDeleting(false);
    refetch();
  };

  const togglePublished = async (id: string, current: boolean) => {
    await supabase.from('projects').update({ is_published: !current }).eq('id', id);
    refetch();
  };

  return (
    <div className="min-h-screen" style={{ background: '#F8F5F1' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-30 px-4 sm:px-6 h-16 flex items-center justify-between"
        style={{ background: 'var(--color-walnut)', boxShadow: 'var(--shadow-md)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
            style={{ background: 'var(--color-brass)', color: 'var(--color-charcoal)' }}
          >
            HW
          </div>
          <span className="font-semibold" style={{ color: 'var(--color-warm-white)', fontFamily: 'var(--font-display)' }}>
            {t('admin.dashboard.title')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" target="_blank" className="text-xs px-3 py-1.5 rounded border border-white/20 text-white/70 hover:text-white transition-colors">
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm px-3 py-1.5 rounded transition-colors hover:bg-white/10"
            style={{ color: 'rgba(250,248,244,0.7)' }}
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">{t('admin.dashboard.logout')}</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-walnut)' }}>{t('admin.dashboard.projects')}</h2>
            <p className="text-sm" style={{ color: 'var(--color-oak)' }}>{projects.length} projects total</p>
          </div>
          <Link to="/admin/editor/new">
            <Button variant="primary" size="sm">
              <Plus size={16} className="me-1.5" />
              {t('admin.dashboard.addProject')}
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 rounded-lg animate-pulse" style={{ background: 'var(--color-sand)' }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div
            className="text-center py-16 rounded-xl"
            style={{ background: 'var(--color-warm-white)', border: '1px dashed var(--color-sand)' }}
          >
            <p className="mb-4" style={{ color: 'var(--color-oak)' }}>{t('admin.dashboard.noProjects')}</p>
            <Link to="/admin/editor/new">
              <Button variant="primary" size="sm">
                <Plus size={16} className="me-1.5" />
                {t('admin.dashboard.addProject')}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-sand)' }}>
            <table className="w-full text-sm" style={{ background: 'var(--color-warm-white)' }}>
              <thead>
                <tr style={{ background: 'var(--color-cream)', borderBottom: '1px solid var(--color-sand)' }}>
                  <th className="text-start px-4 py-3 font-semibold" style={{ color: 'var(--color-walnut)' }}>Project</th>
                  <th className="text-start px-4 py-3 font-semibold hidden sm:table-cell" style={{ color: 'var(--color-walnut)' }}>Category</th>
                  <th className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--color-walnut)' }}>Status</th>
                  <th className="text-end px-4 py-3 font-semibold" style={{ color: 'var(--color-walnut)' }}>{t('admin.dashboard.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, i) => (
                  <motion.tr
                    key={project.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{ borderBottom: '1px solid var(--color-sand)' }}
                    className="hover:bg-[var(--color-cream)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.cover_image}
                          alt=""
                          className="w-10 h-10 rounded object-cover shrink-0"
                        />
                        <div>
                          <p className="font-medium" style={{ color: 'var(--color-walnut)' }}>{project.title_en}</p>
                          {project.is_featured && (
                            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-brass)' }}>
                              <Star size={10} fill="currentColor" /> Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell" style={{ color: 'var(--color-oak)' }}>
                      {project.category || '—'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => togglePublished(project.id, project.is_published)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                        style={{
                          background: project.is_published ? 'rgba(74,93,62,0.1)' : 'rgba(160,82,45,0.1)',
                          color: project.is_published ? 'var(--color-forest)' : 'var(--color-clay)',
                        }}
                        title={project.is_published ? 'Click to unpublish' : 'Click to publish'}
                      >
                        {project.is_published ? <Eye size={11} /> : <EyeOff size={11} />}
                        {project.is_published ? t('admin.dashboard.published') : t('admin.dashboard.draft')}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/editor/${project.id}`}
                          className="p-1.5 rounded hover:bg-[var(--color-sand)] transition-colors"
                          style={{ color: 'var(--color-brass)' }}
                          title={t('admin.dashboard.edit')}
                        >
                          <Edit2 size={15} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(project.id)}
                          className="p-1.5 rounded hover:bg-red-50 transition-colors text-red-500"
                          title={t('admin.dashboard.delete')}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('admin.dashboard.delete')}
      >
        <p className="text-sm mb-5" style={{ color: 'var(--color-oak)' }}>
          {t('admin.dashboard.deleteConfirm')}
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" size="sm" loading={deleting} onClick={handleDelete}>
            {t('admin.dashboard.delete')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
