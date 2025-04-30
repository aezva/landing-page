'use client';

import { useLanguage } from '../context/LanguageContext';
import styles from './Footer.module.css';
import { translations } from '../translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h2 className={styles.logo}>NIA</h2>
        </div>
        
        <div className={styles.menuSection}>
          <div className={styles.menuColumn}>
            <h3 className={styles.menuTitle}>{t.menu.product}</h3>
            <ul className={styles.menuList}>
              <li><a href="#">{t.menu.features}</a></li>
              <li><a href="#">{t.menu.pricing}</a></li>
              <li><a href="#">{t.menu.integrations}</a></li>
            </ul>
          </div>
          
          <div className={styles.menuColumn}>
            <h3 className={styles.menuTitle}>{t.menu.company}</h3>
            <ul className={styles.menuList}>
              <li><a href="#">{t.menu.about}</a></li>
              <li><a href="#">{t.menu.blog}</a></li>
              <li><a href="#">{t.menu.careers}</a></li>
            </ul>
          </div>
          
          <div className={styles.menuColumn}>
            <h3 className={styles.menuTitle}>{t.menu.resources}</h3>
            <ul className={styles.menuList}>
              <li><a href="#">{t.menu.documentation}</a></li>
              <li><a href="#">{t.menu.help}</a></li>
              <li><a href="#">{t.menu.contact}</a></li>
            </ul>
          </div>
          
          <div className={styles.menuColumn}>
            <h3 className={styles.menuTitle}>{t.menu.legal}</h3>
            <ul className={styles.menuList}>
              <li><a href="#">{t.menu.privacy}</a></li>
              <li><a href="#">{t.menu.terms}</a></li>
              <li><a href="#">{t.menu.cookies}</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.socialSection}>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>Twitter</a>
            <a href="#" className={styles.socialLink}>LinkedIn</a>
            <a href="#" className={styles.socialLink}>Instagram</a>
          </div>
          <p className={styles.copyright}>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
} 