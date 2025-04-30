"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { translations } from '../translations';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleLanguage();
  };

  const handleScrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    const headerHeight = document.querySelector(`.${styles.header}`)?.getBoundingClientRect().height || 0;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          NNIA
        </Link>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          {translations[language].header.menu.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={styles.navLink}
              onClick={(e) => handleScrollToSection(e, item.href)}
            >
              {item.text}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <button
            className={styles.languageButton}
            onClick={handleLanguageToggle}
            aria-label={language === 'en' ? 'Cambiar a español' : 'Switch to English'}
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
          <Link href="/login" className={`${styles.navLink} ${styles.signInLink}`}>
            {translations[language].header.signIn}
          </Link>
          <Link href="/register" className={styles.actionButton}>
            {translations[language].header.actionButton}
          </Link>
          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.menuIcon} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 