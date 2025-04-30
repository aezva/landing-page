'use client';

import { useLanguage } from '../context/LanguageContext';
import styles from './WhyChooseNIA.module.css';
import { translations } from '../translations';
import Image from 'next/image';

export default function WhyChooseNIA() {
  const { language } = useLanguage();
  const t = translations[language].whyChooseNIA;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.subtitle}>{t.description1} {t.description2}</p>
        <div className={styles.features}>
          {t.features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.imageContainer}>
                <Image
                  src="/img/niaheroimg.webp"
                  alt={feature.title}
                  width={300}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 