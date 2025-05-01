'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Login.module.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Login: React.FC = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const t = translations[language].login;
  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t.errors.required;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.errors.invalidEmail;
    }
    if (!formData.password) {
      newErrors.password = t.errors.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        // Obtener el clientID del usuario
        const { data: profile } = await supabase
          .from('users')
          .select('client_id')
          .eq('id', data.user.id)
          .single();

        if (profile?.client_id) {
          // Redirigir al panel específico del cliente
          window.location.href = `/client-panel/${profile.client_id}`;
        } else {
          throw new Error('No se encontró el ID del cliente');
        }
      } catch (err) {
        setErrors({
          submit: err instanceof Error ? err.message : 'Error al iniciar sesión'
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>NNIA</div>
        </div>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              {t.form.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              {t.form.password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          {errors.submit && <span className={styles.error}>{errors.submit}</span>}

          <button type="submit" className={styles.submitButton}>
            {t.form.submit}
          </button>
        </form>

        <div className={styles.signUpLink}>
          {t.form.dontHaveAccount}{' '}
          <Link href="/register">{t.form.signUp}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 