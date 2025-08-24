import React, { useState } from 'react';

function Signup({ setPage, setCurrentUser }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username.trim() && formData.password.trim()) {
      // Check if localStorage is available
      if (typeof window !== "undefined" && window.localStorage) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user already exists
        const existingUser = users.find(u => u.username === formData.username);
        if (existingUser) {
          alert('Username already exists! Please choose a different username.');
          return;
        }
        
        const newUser = { 
          username: formData.username, 
          password: formData.password,
          todos: []
        };
        
        localStorage.setItem(
          'users',
          JSON.stringify([...users, newUser])
        );

        // Reset form and redirect to Login Page
        setFormData({ username: '', password: '' });
        alert('Account created successfully! Please log in.');
        setPage('login');
      } else {
        console.error('localStorage is not available');
      }
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div>
      <h1 className="modern-heading">Create Account</h1>
      <form onSubmit={handleSubmit} className="modern-form">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Choose a username"
          className="modern-input"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create a password"
          className="modern-input"
          required
        />
        <button type="submit" className="modern-btn modern-btn-primary">
          Create Account
        </button>
      </form>
      <div className="modern-btn-group">
        <button className="modern-btn modern-btn-outline" onClick={() => setPage('welcome')}>
          ← Back to Welcome
        </button>
      </div>
    </div>
  );
}

export default Signup;
