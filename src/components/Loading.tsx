import React from 'react';
import '../styles/Loading.css';

const Loading: React.FC = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-dot"></div>
      </div>
      <div className="loading-text">
        <span className="loading-word">Smart</span>
        <span className="loading-word">Hive</span>
      </div>
    </div>
  );
};

export default Loading; 