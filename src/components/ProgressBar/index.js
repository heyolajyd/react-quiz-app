import React from 'react';
import styles from './index.module.css';

/**
 * ProgressBar component 
 */
const ProgressBar = ({ questionNumber, questionCount }) => {
  const width = questionNumber && questionCount
    ? (questionNumber / questionCount) * 100
    : 0;

  return (
    <div className={styles['progress-container']}>
      <div className={styles['progress']} style={{ width: `${width}%` }} />
    </div>
  );
};

export default ProgressBar;
