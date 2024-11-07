import React from 'react';
import styles from './CounterPage.module.css';

const CounterPage: React.FC = () => {
  return (
    <main className={styles.page}>
      <div className={styles.counter}>
        <h3>0</h3>
        <button>Reset</button>
        <div className={styles.actionsContainer}>
            <button>-</button>
            <button>+</button>
        </div>
      </div>
    </main>
  );
};

export default CounterPage;
