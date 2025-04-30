"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';
import { translations } from '../translations';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight - 80;
      const opacity = Math.max(0, 1 - (scrollPosition / heroHeight));
      setOverlayOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.titleSection}>
        <h1 className={styles.heroTitle}>{t.title}</h1>
        <p className={styles.heroSubtitle}>{t.subtitle}</p>
      </div>
      <div className={styles.imageSection}>
        <div className={styles.imageContainer}>
          <Image
            src="/img/niaheroimg.webp"
            alt="NIA Hero"
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: 'contain',
              objectPosition: 'center bottom'
            }}
          />
        </div>
        <div className={styles.overlay} style={{ opacity: overlayOpacity }} />
        <div className={styles.buttonContainer}>
          <p className={styles.heroDescription}>
            {t.description.line1}
          </p>
          <Link href="/register" className={styles.heroButton}>
            {t.button}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero; 