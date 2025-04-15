'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type RegisterFormData = {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
  phoneNumber: string;
};

export default function RegisterForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(t('registration_failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('register')}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fullName" className="sr-only">
                {t('fullName')}
              </label>
              <input
                {...register('fullName', { required: true })}
                id="fullName"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t('fullName')}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{t('fullName_required')}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                {t('email')}
              </label>
              <input
                {...register('email', { required: true })}
                id="email"
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{t('email_required')}</p>
              )}
            </div>
            <div>
              <label htmlFor="companyName" className="sr-only">
                {t('companyName')}
              </label>
              <input
                {...register('companyName', { required: true })}
                id="companyName"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t('companyName')}
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-600">{t('companyName_required')}</p>
              )}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="sr-only">
                {t('phoneNumber')}
              </label>
              <input
                {...register('phoneNumber', { required: true })}
                id="phoneNumber"
                type="tel"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t('phoneNumber')}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{t('phoneNumber_required')}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t('password')}
              </label>
              <input
                {...register('password', { required: true })}
                id="password"
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t('password')}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{t('password_required')}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? t('loading') : t('register')}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t('haveAccount')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 