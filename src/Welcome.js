import React from 'react';

function Welcome({ setPage }) {
  return (
    <div className="welcome">
      <h1 className="welcome-title">Welcome to Your To-Do App</h1>
      <p className="welcome-subtitle">Organize your tasks with ease!</p>
      <div className="welcome-buttons">
        <button className="welcome-btn" onClick={() => setPage('signup')}>
          Sign Up
        </button>
        <button className="welcome-btn" onClick={() => setPage('login')}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default Welcome;
