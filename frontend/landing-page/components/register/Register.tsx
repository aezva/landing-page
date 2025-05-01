'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Register.module.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import LoadingSpinner from '../../components/LoadingSpinner';

const Register: React.FC = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const t = translations[language].register;
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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
    } else if (formData.password.length < 6) {
      newErrors.password = t.errors.minPassword;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.errors.passwordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        // 1. Registrar el usuario
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              email_verified: false
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          // 2. Generar un client_id único
          const client_id = `client_${data.user.id.slice(0, 8)}_${Date.now()}`;
          
          // 3. Crear el perfil del usuario con el client_id
          const { error: profileError } = await supabase
            .from('users')
            .insert([
              {
                id: data.user.id,
                email: data.user.email,
                client_id: client_id,
                created_at: new Date().toISOString(),
                onboarding_completed: false,
                email_verified: false
              }
            ]);

          if (profileError) throw profileError;

          // 4. Iniciar sesión automáticamente
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });

          if (signInError) throw signInError;

          // 5. Redirigir al panel del cliente
          const clientPanelUrl = process.env.NEXT_PUBLIC_CLIENT_PANEL_URL || 'http://localhost:4000';
          window.location.href = `${clientPanelUrl}/client-panel/${client_id}`;
        }
      } catch (err) {
        console.error('Error en el registro:', err);
        setErrors({
          submit: err instanceof Error ? err.message : 'Error al registrar'
        });
      } finally {
        setIsLoading(false);
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
      {isLoading && <LoadingSpinner />}
      <div className={styles.registerBox}>
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

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="confirmPassword">
              {t.form.confirmPassword}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
          </div>

          {errors.submit && <span className={styles.error}>{errors.submit}</span>}

          <button type="submit" className={styles.submitButton}>
            {t.form.submit}
          </button>
        </form>

        <div className={styles.signInLink}>
          {t.form.alreadyHaveAccount}{' '}
          <Link href="/login">{t.form.signIn}</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 