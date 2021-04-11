import React from 'react';

import styles from './LoadingBar.css';

const LoadingBar = ({ show }) => {
  return (
    <div
      className={[styles.LoadingBar, show ? styles.loading : ''].join(' ')}
    />
  );
};

export default LoadingBar;
