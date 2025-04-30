'use client';

import { useLanguage } from '../context/LanguageContext';
import styles from './CTASection.module.css';
import { translations } from '../translations';
import Link from 'next/link';

export default function CTASection() {
  const { language } = useLanguage();
  const t = translations[language].cta;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.ctaBox}>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.description}>{t.subtitle}</p>
          <Link href="/register" className={styles.button}>{t.button}</Link>
        </div>
      </div>
    </section>
  );
} 