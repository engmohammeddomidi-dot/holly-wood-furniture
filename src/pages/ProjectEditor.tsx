import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, X, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { supabase, CATEGORIES } from '../lib/supabase';
import type { Project, ProjectMedia } from '../lib/supabase';

const generateSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

export const ProjectEditor: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const [form, setForm] = useState({
    title_en: '', title_ar: '', slug: '',
    description_en: '', description_ar: '',
    category: '', cover_image: '',
    is_published: true, is_featured: false, display_order: 0,
  });
  const [media, setMedia] = useState<ProjectMedia[]>([]);

  useEffect(() => {
    if (!isNew) {
      supabase
        .from('projects')
        .select('*, media:project_media(*)')
        .eq('id', id)
        .single()
        .then(({ data }) => {
          if (data) {
            const { media: m, ...project } = data as Project;
            setForm({
              title_en: project.title_en,
              title_ar: project.title_ar,
              slug: project.slug,
              description_en: project.description_en || '',
              description_ar: project.description_ar || '',
              category: project.category || '',
              cover_image: project.cover_image,
              is_published: project.is_published,
              is_featured: project.is_featured,
              display_order: project.display_order,
            });
            setMedia((m || []).sort((a: ProjectMedia, b: ProjectMedia) => a.sort_order - b.sort_order));
          }
          setLoading(false);
        });
    }
  }, [id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      ...(name === 'title_en' ? { slug: generateSlug(value) } : {}),
    }));
  };

  const uploadFile = async (file: File, bucket: string): Promise<string> => {
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const url = await uploadFile(file, 'project-covers');
      setForm((f) => ({ ...f, cover_image: url }));
    } finally {
      setUploadingCover(false);
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingMedia(true);
    try {
      for (const file of files) {
        const isVideo = file.type.startsWith('video/');
        const url = await uploadFile(file, isVideo ? 'project-videos' : 'project-media');
        setMedia((m) => [...m, {
          id: `temp-${Date.now()}-${Math.random()}`,
          project_id: id || '',
          media_url: url,
          media_type: isVideo ? 'video' : 'image',
          caption_en: null,
          caption_ar: null,
          sort_order: m.length,
          created_at: new Date().toISOString(),
        }]);
      }
    } finally {
      setUploadingMedia(false);
    }
  };

  const removeMedia = (mediaId: string) =>
    setMedia((m) => m.filter((item) => item.id !== mediaId));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let projectId = id;

      if (isNew) {
        const { data, error } = await supabase.from('projects').insert([form]).select().single();
        if (error) throw error;
        projectId = data.id;
      } else {
        const { error } = await supabase.from('projects').update({ ...form, updated_at: new Date().toISOString() }).eq('id', id);
        if (error) throw error;
        // Delete old media and re-insert
        await supabase.from('project_media').delete().eq('project_id', projectId);
      }

      if (media.length > 0) {
        const mediaRows = media.map((m, i) => ({
          project_id: projectId,
          media_url: m.media_url,
          media_type: m.media_type,
          caption_en: m.caption_en,
          caption_ar: m.caption_ar,
          sort_order: i,
        }));
        await supabase.from('project_media').insert(mediaRows);
      }

      navigate('/admin/dashboard');
    } finally {
      setSaving(false);
    }
  };

  const labelClass = 'block text-sm font-medium mb-1.5';
  const labelStyle = { color: 'var(--color-walnut)' };
  const inputClass = 'w-full px-4 py-2.5 rounded border text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--color-brass)] focus:border-[var(--color-brass)]';
  const inputStyle = { borderColor: '#E0D5C8', color: '#3E2723', background: '#FAF8F4' };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8F5F1' }}>
        <div className="w-8 h-8 border-2 border-[var(--color-brass)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8F5F1' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-30 px-4 sm:px-6 h-16 flex items-center justify-between"
        style={{ background: 'var(--color-walnut)', boxShadow: 'var(--shadow-md)' }}
      >
        <div className="flex items-center gap-3">
          <Link to="/admin/dashboard" className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style={{ color: 'rgba(250,248,244,0.7)' }}>
            <ArrowLeft size={16} />
            {t('admin.editor.back')}
          </Link>
        </div>
        <span className="font-semibold" style={{ color: 'var(--color-warm-white)', fontFamily: 'var(--font-display)' }}>
          {isNew ? t('admin.editor.newProject') : t('admin.editor.editProject')}
        </span>
        <div className="w-24" />
      </header>

      <form onSubmit={handleSave} className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Titles */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-6 space-y-4"
          style={{ background: 'var(--color-warm-white)', border: '1px solid var(--color-sand)', boxShadow: 'var(--shadow-sm)' }}
        >
          <h3 className="font-semibold mb-2" style={{ color: 'var(--color-walnut)' }}>Basic Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={labelStyle}>{t('admin.editor.titleEn')} *</label>
              <input required name="title_en" value={form.title_en} onChange={handleChange} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>{t('admin.editor.titleAr')} *</label>
              <input required name="title_ar" value={form.title_ar} onChange={handleChange} className={inputClass} style={{ ...inputStyle, direction: 'rtl', textAlign: 'right' }} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={labelStyle}>{t('admin.editor.slug')}</label>
              <input name="slug" value={form.slug} onChange={handleChange} className={inputClass} style={inputStyle} />
              <p className="text-xs mt-1" style={{ color: 'var(--color-oak)' }}>{t('admin.editor.slugHint')}</p>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>{t('admin.editor.category')}</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass} style={inputStyle}>
                <option value="">—</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.replace(/-/g, ' ')}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={labelStyle}>{t('admin.editor.descEn')}</label>
              <textarea name="description_en" value={form.description_en} onChange={handleChange} rows={4} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>{t('admin.editor.descAr')}</label>
              <textarea name="description_ar" value={form.description_ar} onChange={handleChange} rows={4} className={inputClass} style={{ ...inputStyle, direction: 'rtl', textAlign: 'right' }} />
            </div>
          </div>
        </motion.div>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl p-6"
          style={{ background: 'var(--color-warm-white)', border: '1px solid var(--color-sand)', boxShadow: 'var(--shadow-sm)' }}
        >
          <h3 className="font-semibold mb-4" style={{ color: 'var(--color-walnut)' }}>{t('admin.editor.coverImage')}</h3>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {form.cover_image ? (
              <div className="relative rounded-lg overflow-hidden w-40 h-28 shrink-0">
                <img src={form.cover_image} alt="Cover" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, cover_image: '' }))}
                  className="absolute top-1 end-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <label
                className="flex flex-col items-center justify-center w-40 h-28 rounded-lg border-2 border-dashed cursor-pointer transition-colors hover:border-[var(--color-brass)]"
                style={{ borderColor: 'var(--color-sand)' }}
              >
                <Upload size={20} style={{ color: 'var(--color-honey)' }} />
                <span className="text-xs mt-2" style={{ color: 'var(--color-oak)' }}>
                  {uploadingCover ? t('admin.editor.uploadingMedia') : 'Upload'}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} disabled={uploadingCover} />
              </label>
            )}
            <div className="flex-1">
              <label className={labelClass} style={labelStyle}>Or enter URL</label>
              <input
                name="cover_image" value={form.cover_image} onChange={handleChange}
                placeholder="https://..." className={inputClass} style={inputStyle}
              />
            </div>
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl p-6"
          style={{ background: 'var(--color-warm-white)', border: '1px solid var(--color-sand)', boxShadow: 'var(--shadow-sm)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: 'var(--color-walnut)' }}>{t('admin.editor.media')}</h3>
            <label className="flex items-center gap-2 text-sm px-3 py-1.5 rounded cursor-pointer transition-all duration-200 hover:opacity-90" style={{ background: 'var(--color-brass)', color: 'white' }}>
              <Upload size={14} />
              {uploadingMedia ? t('admin.editor.uploadingMedia') : t('admin.editor.addMedia')}
              <input type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleMediaUpload} disabled={uploadingMedia} />
            </label>
          </div>
          {media.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: 'var(--color-oak)' }}>No media yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {media.map((item) => (
                <div key={item.id} className="relative group rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-sand)' }}>
                  {item.media_type === 'image' ? (
                    <img src={item.media_url} alt="" className="w-full h-24 object-cover" />
                  ) : (
                    <video src={item.media_url} className="w-full h-24 object-cover" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(item.id)}
                    className="absolute top-1 end-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                  <div className="absolute bottom-0 start-0 end-0 p-1 bg-black/40">
                    <span className="text-xs text-white/70">{item.media_type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl p-6 space-y-3"
          style={{ background: 'var(--color-warm-white)', border: '1px solid var(--color-sand)', boxShadow: 'var(--shadow-sm)' }}
        >
          <h3 className="font-semibold mb-2" style={{ color: 'var(--color-walnut)' }}>Settings</h3>
          {[
            { name: 'is_published', label: t('admin.editor.isPublished') },
            { name: 'is_featured', label: t('admin.editor.isFeatured') },
          ].map(({ name, label }) => (
            <label key={name} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name={name}
                checked={form[name as keyof typeof form] as boolean}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-[var(--color-brass)]"
              />
              <span className="text-sm" style={{ color: 'var(--color-walnut)' }}>{label}</span>
            </label>
          ))}
          <div className="pt-2">
            <label className={labelClass} style={labelStyle}>{t('admin.editor.displayOrder')}</label>
            <input
              type="number" name="display_order" value={form.display_order}
              onChange={handleChange} className={`${inputClass} w-24`} style={inputStyle}
            />
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pb-8">
          <Link to="/admin/dashboard">
            <Button type="button" variant="ghost" size="md">{t('admin.editor.cancel')}</Button>
          </Link>
          <Button type="submit" variant="primary" size="md" loading={saving}>
            {saving ? t('admin.editor.saving') : t('admin.editor.save')}
          </Button>
        </div>
      </form>
    </div>
  );
};
