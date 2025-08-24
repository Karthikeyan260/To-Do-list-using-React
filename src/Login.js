import React, { useState } from 'react';

function Login({ setCurrentUser, setPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.username === username);

      if (user && user.password === password) {
        setCurrentUser(username);
        setPage('todo');
        alert('Login Successful!');
      } else {
        alert('Invalid Username or Password');
      }
    } else {
      console.error('localStorage is not available');
    }
  };

  return (
    <div>
      <h1 className="modern-heading">Welcome Back</h1>
      <div className="modern-form">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="modern-input"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="modern-input"
        />
        <button onClick={handleLogin} className="modern-btn modern-btn-primary">
          Sign In
        </button>
      </div>
      <div className="modern-btn-group">
        <button className="modern-btn modern-btn-outline" onClick={() => setPage('welcome')}>
          ← Back to Welcome
        </button>
      </div>
    </div>
  );
}

export default Login;
