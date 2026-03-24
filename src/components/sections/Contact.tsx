import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate form submission (integrate with email service as needed)
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
  };

  const inputClass = `w-full px-4 py-3 rounded border text-sm outline-none transition-all duration-200
    focus:ring-2 focus:ring-[var(--color-brass)] focus:border-[var(--color-brass)]`;
  const inputStyle = {
    background: 'var(--color-warm-white)',
    borderColor: 'var(--color-sand)',
    color: 'var(--color-walnut)',
  };

  const services = [
    'custom-furniture', 'kitchen-cabinets', 'restoration',
    'interior-woodwork', 'outdoor-furniture', 'commercial',
  ];

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('contact.label')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {status === 'success' ? (
              <div
                className="rounded-xl p-8 text-center"
                style={{ background: 'var(--color-warm-white)', border: '1px solid var(--color-sand)', boxShadow: 'var(--shadow-md)' }}
              >
                <div className="text-4xl mb-4">✓</div>
                <p className="text-lg font-medium" style={{ color: 'var(--color-forest)' }}>
                  {t('contact.form.success')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-walnut)' }}>
                      {t('contact.form.name')} <span style={{ color: 'var(--color-clay)' }}>*</span>
                    </label>
                    <input
                      required name="name" value={form.name} onChange={handleChange}
                      className={inputClass} style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-walnut)' }}>
                      {t('contact.form.email')} <span style={{ color: 'var(--color-clay)' }}>*</span>
                    </label>
                    <input
                      required type="email" name="email" value={form.email} onChange={handleChange}
                      className={inputClass} style={inputStyle}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-walnut)' }}>
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel" name="phone" value={form.phone} onChange={handleChange}
                      className={inputClass} style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-walnut)' }}>
                      {t('contact.form.service')}
                    </label>
                    <select
                      name="service" value={form.service} onChange={handleChange}
                      className={inputClass} style={inputStyle}
                    >
                      <option value="">{t('contact.form.selectService')}</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{t(`portfolio.categories.${s}` as any)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-walnut)' }}>
                    {t('contact.form.message')} <span style={{ color: 'var(--color-clay)' }}>*</span>
                  </label>
                  <textarea
                    required name="message" value={form.message} onChange={handleChange}
                    rows={5} className={inputClass} style={inputStyle}
                  />
                </div>
                {status === 'error' && (
                  <p className="text-sm" style={{ color: 'var(--color-clay)' }}>{t('contact.form.error')}</p>
                )}
                <Button type="submit" variant="primary" size="lg" loading={status === 'sending'} className="w-full sm:w-auto">
                  {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            {[
              { icon: MapPin, text: t('contact.info.address') },
              { icon: Phone, text: t('contact.info.phone'), href: `tel:${t('contact.info.phone')}` },
              { icon: Mail, text: t('contact.info.email'), href: `mailto:${t('contact.info.email')}` },
              { icon: Clock, text: t('contact.info.hours') },
            ].map(({ icon: Icon, text, href }, i) => (
              <div key={i} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'var(--color-sand)' }}
                >
                  <Icon size={18} style={{ color: 'var(--color-brass)' }} />
                </div>
                {href ? (
                  <a href={href} className="text-sm leading-relaxed hover:text-[var(--color-brass)] transition-colors pt-2.5" style={{ color: 'var(--color-oak)' }}>
                    {text}
                  </a>
                ) : (
                  <p className="text-sm leading-relaxed pt-2.5" style={{ color: 'var(--color-oak)' }}>{text}</p>
                )}
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-90"
              style={{ background: '#25D366', color: 'white' }}
            >
              <MessageCircle size={18} />
              {t('contact.info.whatsapp')}
            </a>

            {/* Map placeholder */}
            <div
              className="w-full h-48 rounded-lg overflow-hidden mt-4"
              style={{ background: 'var(--color-sand)', border: '1px solid var(--color-sand)' }}
            >
              <iframe
                title="Workshop location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.8!2d55.3!3d25.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzAwLjAiTiA1NcKwMTgnMDAuMCJF!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
