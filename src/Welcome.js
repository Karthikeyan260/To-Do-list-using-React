import React from 'react';

function Welcome({ setPage }) {
  return (
    <div className="modern-welcome">
      <div className="modern-welcome-icon">✨</div>
      <h1 className="modern-title">Welcome to TaskFlow</h1>
      <p className="modern-subtitle">Organize your tasks with style and efficiency!</p>
      <div className="modern-btn-group">
        <button className="modern-btn modern-btn-primary" onClick={() => setPage('signup')}>
          Get Started
        </button>
        <button className="modern-btn modern-btn-outline" onClick={() => setPage('login')}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Welcome;
