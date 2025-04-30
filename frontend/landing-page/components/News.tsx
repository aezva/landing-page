'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import styles from './News.module.css';
import { translations } from '../translations';
import NewsPopup from './NewsPopup';

export default function News() {
  const { language } = useLanguage();
  const t = translations[language].news;
  const [selectedNews, setSelectedNews] = useState<number | null>(null);

  return (
    <section className={styles.section} id="news">
      <div className={styles.container}>
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.subtitle}>{t.subtitle}</p>
        <div className={styles.newsGrid}>
          {t.entries.map((entry, index) => (
            <article 
              key={index} 
              className={styles.newsCard}
              onClick={() => setSelectedNews(index)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.newsContent}>
                <h3 className={styles.newsTitle}>{entry.title}</h3>
                <p className={styles.newsDate}>{entry.date}</p>
                <p className={styles.newsDescription}>{entry.preview}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      {selectedNews !== null && (
        <NewsPopup
          entry={{
            title: t.entries[selectedNews].title,
            date: t.entries[selectedNews].date,
            description: t.entries[selectedNews].description
          }}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </section>
  );
} 