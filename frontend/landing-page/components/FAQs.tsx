'use client';

import React, { useState } from 'react';
import styles from './FAQs.module.css';
import { translations } from '../translations';
import { useLanguage } from '../context/LanguageContext';

export default function FAQs() {
  const { language } = useLanguage();
  const t = translations[language].faqs;
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="faqs">
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
          <div className={styles.accordion}>
            {t.items.map((item: { title: string; description: string }, index: number) => (
              <div key={index} className={styles.accordionItem}>
                <button
                  className={`${styles.accordionButton} ${activeIndex === index ? styles.active : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  {item.title}
                  <span className={styles.accordionIcon}>
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`${styles.accordionContent} ${activeIndex === index ? styles.active : ''}`}
                >
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 