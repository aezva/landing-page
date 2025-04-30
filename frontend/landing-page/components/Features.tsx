"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Features.module.css';
import { translations } from '../translations';
import { useLanguage } from '../context/LanguageContext';

const Features: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].features;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const getImageSrc = (index: number) => {
    return index === 1 ? '/img/niaheroimg2.webp' : '/img/niaheroimg.webp';
  };

  const getItemType = (index: number) => {
    switch(index) {
      case 0: return 'analytics';
      case 1: return 'automation';
      case 2: return 'integration';
      case 3: return 'ai';
      case 4: return 'security';
      default: return '';
    }
  };

  return (
    <section className={styles.featuresSection} id="features">
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
          <div className={styles.accordion}>
            {t.items.map((item: { title: string; description: string }, index: number) => (
              <div key={index} className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}>
                <button
                  className={`${styles.accordionButton} ${activeIndex === index ? styles.active : ''}`}
                  onClick={() => handleAccordionClick(index)}
                  data-type={getItemType(index)}
                >
                  {item.title}
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
        <div className={styles.rightSection}>
          <div className={styles.imageContainer}>
            <Image
              src={getImageSrc(activeIndex || 0)}
              alt={t.items[activeIndex || 0].title}
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'opacity 0.3s ease'
              }}
              className={styles.featureImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 