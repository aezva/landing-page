import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Business.module.css';
import { translations } from '../translations';
import { useLanguage } from '../context/LanguageContext';

interface AccordionItem {
  title: string;
  description: string;
}

interface BusinessContent {
  title: string;
  subtitle: string;
  accordion: {
    items: AccordionItem[];
  };
}

const Business: React.FC = () => {
  const { language } = useLanguage();
  const content = translations[language].business as BusinessContent;
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const getImageSrc = (index: number) => {
    return index === 1 ? '/img/niaheroimg2.webp' : '/img/niaheroimg.webp';
  };

  const renderFeatures = (description: string) => {
    const lines = description.split('\n');
    const mainText = lines.slice(0, 2).join(' '); // Une las dos primeras líneas en un solo párrafo
    const features = lines.slice(2); // Resto como características
    return (
      <>
        <p>{mainText}</p>
        <div className={styles.featuresList}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={styles.featureText}>{feature.replace('👉 ', '')}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <section className={styles.section} id="business">
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.imageContainer}>
            <Image
              src={getImageSrc(activeIndex || 0)}
              alt={content.accordion.items[activeIndex || 0].title}
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
                transition: 'opacity 0.3s ease'
              }}
              className={styles.featureImage}
            />
          </div>
        </div>
        <div className={styles.rightSection}>
          <h2 className={styles.title}>{content.title}</h2>
          <p className={styles.subtitle}>{content.subtitle}</p>
          <div className={styles.accordion}>
            {content.accordion.items.map((item, index) => (
              <div key={index} className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}>
                <button
                  className={`${styles.accordionButton} ${activeIndex === index ? styles.active : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  {item.title}
                </button>
                <div
                  className={`${styles.accordionContent} ${activeIndex === index ? styles.active : ''}`}
                >
                  {renderFeatures(item.description)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Business; 