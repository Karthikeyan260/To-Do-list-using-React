import React, { useState } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do List
        </Typography>
        <TextField 
          variant="outlined" 
          fullWidth 
          value={task} 
          onChange={handleInputChange} 
          placeholder="Add a new task" 
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddTask} 
          style={{ marginTop: '10px' }}
        >
          Add Task
        </Button>
        <List>
          {tasks.map(t => (
            <ListItem key={t.id} style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
              <ListItemText 
                primary={t.text} 
                onClick={() => handleToggleTask(t.id)} 
                style={{ cursor: 'pointer' }} 
              />
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveTask(t.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;