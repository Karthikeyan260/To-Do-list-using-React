import React, { useState } from 'react';

function Signup({ setPage }) {
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
        localStorage.setItem(
          'users',
          JSON.stringify([...users, { ...formData }])
        );

        // Reset form and redirect to Welcome Page
        setFormData({ username: '', password: '' });
        setPage('welcome'); // Redirect to Welcome Page
      } else {
        console.error('localStorage is not available');
      }
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div className="form-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter your username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <button className="back-button" onClick={() => setPage('welcome')}>
        Back to Welcome
      </button>
    </div>
  );
}

export default Signup;
