import React, { useState, useEffect } from 'react';

function Todo({ currentUser, setCurrentUser, setPage }) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[currentUser]) {
      setTasks(users[currentUser].todos);
    }
  }, [currentUser]);

  const handleAddTask = () => {
    if (task.trim()) {
      const newTasks = [...tasks, { id: Date.now(), text: task, completed: false }];
      setTasks(newTasks);
      updateUserTodos(newTasks);
      setTask('');
    }
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    updateUserTodos(updatedTasks);
  };

  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    updateUserTodos(updatedTasks);
  };

  const updateUserTodos = (newTasks) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[currentUser]) {
      users[currentUser].todos = newTasks;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage('welcome');
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="modern-todo-container">
      <div className="modern-todo-header">
        <div>
          <h1 className="modern-heading">Hello, {currentUser}! 👋</h1>
          {totalCount > 0 && (
            <p className="modern-subtitle">
              {completedCount} of {totalCount} tasks completed
            </p>
          )}
        </div>
        <button className="modern-btn modern-btn-danger modern-btn-small" onClick={handleLogout}>
          Sign Out
        </button>
      </div>

      <div className="modern-add-todo">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="modern-input"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <button onClick={handleAddTask} className="modern-btn modern-btn-success">
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="modern-empty-state">
          <div className="modern-empty-state-icon">📝</div>
          <p className="modern-empty-state-text">No tasks yet. Add one above to get started!</p>
        </div>
      ) : (
        <ul className="modern-todo-list">
          {tasks.map((t) => (
            <li key={t.id} className="modern-todo-item">
              <div className="modern-todo-content">
                <span
                  className={`modern-todo-text ${t.completed ? 'completed' : ''}`}
                  onClick={() => handleToggleTask(t.id)}
                >
                  {t.completed ? '✓' : '○'} {t.text}
                </span>
                <div className="modern-todo-actions">
                  <button 
                    className="modern-btn modern-btn-outline modern-btn-small" 
                    onClick={() => handleToggleTask(t.id)}
                  >
                    {t.completed ? 'Undo' : 'Done'}
                  </button>
                  <button 
                    className="modern-btn modern-btn-danger modern-btn-small" 
                    onClick={() => handleRemoveTask(t.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todo;
