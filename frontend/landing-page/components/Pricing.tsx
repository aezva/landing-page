'use client';

import { useLanguage } from '../context/LanguageContext';
import styles from './Pricing.module.css';
import { translations } from '../translations';
import { FaCheck } from 'react-icons/fa';

export default function Pricing() {
  const { language } = useLanguage();
  const t = translations[language].pricing;

  return (
    <section className={styles.section} id="pricing">
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>
        <div className={styles.plansContainer}>
          {t.plans.map((plan, index) => (
            <div key={index} className={styles.planCard}>
              <h3 className={styles.planTitle}>{plan.title}</h3>
              <p className={styles.planPrice}>{plan.price}</p>
              <p className={styles.planDescription}>{plan.description}</p>
              <ul className={styles.featuresList}>
                {plan.features.map((feature, index) => (
                  <li key={index} className={styles.feature}>
                    <FaCheck className={styles.checkIcon} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={styles.planButton}>{t.button}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 