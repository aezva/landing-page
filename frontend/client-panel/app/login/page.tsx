'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '@shared/i18n/LanguageContext';
import { translations } from '@shared/i18n/translations';

export default function LoginPage() {
  const { language } = useLanguage();
  const { signIn } = useAuth();
  const t = translations[language].login;

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
        await signIn(formData.email, formData.password);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t.title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t.subtitle}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                {t.form.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-nia-pink focus:border-nia-pink focus:z-10 sm:text-sm"
                placeholder={t.form.email}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t.form.password}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-nia-pink focus:border-nia-pink focus:z-10 sm:text-sm"
                placeholder={t.form.password}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          {errors.submit && <p className="mt-2 text-sm text-red-600">{errors.submit}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-nia-pink hover:bg-nia-pink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nia-pink"
            >
              {t.form.submit}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link href="/register" className="font-medium text-nia-pink hover:text-nia-pink/90">
              {t.form.dontHaveAccount} {t.form.signUp}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 