import React, { useState } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Paper, Box, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '40px' }}>
      <Paper elevation={6} style={{ padding: '30px', borderRadius: '15px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
          To-Do List
        </Typography>
        <Box display="flex" alignItems="center" gap={2} style={{ marginBottom: '20px' }}>
          <TextField 
            variant="outlined" 
            fullWidth 
            value={task} 
            onChange={handleInputChange} 
            placeholder="Add a new task" 
            InputProps={{
              style: {
                borderRadius: '8px',
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={handleAddTask}
            style={{ padding: '10px 20px', textTransform: 'none', fontWeight: 'bold' }}
          >
            Add
          </Button>
        </Box>

        <List style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {tasks.length > 0 ? (
            tasks.map((t) => (
              <ListItem 
                key={t.id} 
                style={{
                  backgroundColor: '#ffffff',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Checkbox 
                  checked={t.completed}
                  onChange={() => handleToggleTask(t.id)}
                  color="primary"
                />
                <ListItemText 
                  primary={t.text} 
                  primaryTypographyProps={{
                    style: {
                      textDecoration: t.completed ? 'line-through' : 'none',
                      fontSize: '16px',
                    },
                  }}
                />
                <IconButton 
                  edge="end" 
                  aria-label="delete" 
                  onClick={() => handleRemoveTask(t.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <Typography align="center" color="textSecondary">
              No tasks yet. Add a new task to get started!
            </Typography>
          )}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
