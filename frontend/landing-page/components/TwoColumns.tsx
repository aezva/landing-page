'use client';

import styles from './TwoColumns.module.css';

export default function TwoColumns() {
  return (
    <section className={styles.section} id="two-columns">
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.column}>
            {/* Columna izquierda */}
          </div>
          <div className={styles.column}>
            {/* Columna derecha */}
          </div>
        </div>
      </div>
    </section>
  );
} 