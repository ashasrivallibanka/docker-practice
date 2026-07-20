import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks
  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Add task
  const addTask = async () => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div>
      <h1>Full Stack Task Manager</h1>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} 
            <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

