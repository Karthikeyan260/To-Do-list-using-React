import React, { useState, useEffect } from 'react';

function Todo({ currentUser, setCurrentUser }) {
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
  };

  return (
    <div>
      <h2>Your To-Do List</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Log Out
      </button>
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul className="todo-list">
        {tasks.map((t) => (
          <li key={t.id} className="todo-item">
            <span
              className={t.completed ? 'completed' : ''}
              onClick={() => handleToggleTask(t.id)}
            >
              {t.text}
            </span>
            <button className="delete-btn" onClick={() => handleRemoveTask(t.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
