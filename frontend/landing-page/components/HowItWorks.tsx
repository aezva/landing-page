'use client';

import { useLanguage } from '../context/LanguageContext';
import styles from './HowItWorks.module.css';
import { translations } from '../translations';

export default function HowItWorks() {
  const { language } = useLanguage();
  const t = translations[language].howItWorks;

  const steps = [
    {
      title: t.steps[0].title,
      description: t.steps[0].description
    },
    {
      title: t.steps[1].title,
      description: t.steps[1].description
    },
    {
      title: t.steps[2].title,
      description: t.steps[2].description
    },
    {
      title: t.steps[3].title,
      description: t.steps[3].description
    }
  ];

  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h2 className={`${styles.title} fade-up`}>{t.title}</h2>
          <p className={`${styles.subtitle} fade-up`}>{t.subtitle}</p>
        </div>
        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepContent}>
                <h3 className={`${styles.stepTitle} fade-up`}>
                  <span className={styles.stepNumber}>{index + 1}.-</span>
                  {step.title}
                </h3>
                <p className={`${styles.stepDescription} fade-up`}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.finalText}>
          <p className={`${styles.finalLine2} fade-up`}>{t.finalText.line2}</p>
          <button className={styles.actionButton}>{t.button}</button>
        </div>
      </div>
    </section>
  );
} 