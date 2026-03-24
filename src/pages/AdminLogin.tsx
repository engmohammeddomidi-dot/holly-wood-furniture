import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { signIn } from '../lib/auth';
import { Eye, EyeOff } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/admin/dashboard');
    } catch {
      setError(t('admin.login.error'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded border text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--color-brass)] focus:border-[var(--color-brass)]';
  const inputStyle = { borderColor: '#E0D5C8', color: '#3E2723' };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-cream)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-4"
            style={{ background: 'var(--color-walnut)', color: 'var(--color-brass)', fontFamily: 'var(--font-display)' }}
          >
            HW
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-walnut)', fontFamily: 'var(--font-display)' }}>
            {t('admin.login.title')}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-oak)' }}>
            {t('admin.login.subtitle')}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl p-6 space-y-4"
          style={{ background: 'var(--color-warm-white)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-sand)' }}
        >
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-walnut)' }}>
              {t('admin.login.email')}
            </label>
            <input
              required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className={inputClass} style={inputStyle} autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-walnut)' }}>
              {t('admin.login.password')}
            </label>
            <div className="relative">
              <input
                required
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                style={{ ...inputStyle, paddingRight: '2.75rem' }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute inset-y-0 end-3 flex items-center"
                style={{ color: 'var(--color-oak)' }}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" variant="primary" size="md" loading={loading} className="w-full">
            {loading ? t('admin.login.signingIn') : t('admin.login.signIn')}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
