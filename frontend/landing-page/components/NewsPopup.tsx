'use client';

import React, { useEffect } from 'react';
import styles from './NewsPopup.module.css';

interface NewsPopupProps {
  entry: {
    title: string;
    date: string;
    description: string;
  };
  onClose: () => void;
}

const NewsPopup: React.FC<NewsPopupProps> = ({ entry, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '#pricing';
  };

  const renderDescription = () => {
    const parts = entry.description.split('\n\n\n');
    const mainText = parts[0];
    const signature = parts[1];

    return (
      <>
        <div 
          className={styles.description}
          dangerouslySetInnerHTML={{ 
            __html: mainText.replace(/\n/g, '<br />')
          }}
        />
        {signature && <p className={styles.signature}>{signature}</p>}
      </>
    );
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.title}>{entry.title}</h2>
        <p className={styles.date}>{entry.date}</p>
        {renderDescription()}
      </div>
    </div>
  );
};

export default NewsPopup; 