import React, { useState } from 'react';
import Welcome from './Welcome';
import Signup from './Signup';
import Login from './Login';
import Todo from './Todo';
import './App.css';

function App() {
  const [page, setPage] = useState('welcome'); // Tracks the current page
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="container">
      {page === 'welcome' && <Welcome setPage={setPage} />}
      {page === 'signup' && <Signup setCurrentUser={setCurrentUser} setPage={setPage} />}
      {page === 'login' && <Login setCurrentUser={setCurrentUser} setPage={setPage} />}
      {currentUser && page === 'todo' && (
        <Todo currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
}

export default App;
