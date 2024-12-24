import React, { useState } from 'react';

function Login({ setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.username === username);

      if (user && user.password === password) {
        setCurrentUser(username);
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
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;
