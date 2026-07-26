import { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const fetchTodos = () => {
    fetch(`${API_URL}/api/todos`)
      .then(res => res.json())
      .then(data => setTodos(Array.isArray(data) ? data : []))
      .catch(err => console.error('Fetch error:', err));
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    fetch(`${API_URL}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    })
      .then(() => { setTask(''); fetchTodos(); });
  };

  const toggleTodo = (id, completed) => {
    fetch(`${API_URL}/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    }).then(fetchTodos);
  };

  const deleteTodo = (id) => {
    fetch(`${API_URL}/api/todos/${id}`, { method: 'DELETE' }).then(fetchTodos);
  };

  return (
    <div className="App">
      <h1>Capstone Todo App</h1>
      <form onSubmit={addTodo}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(t => (
          <li key={t.id} style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
            <span onClick={() => toggleTodo(t.id, t.completed)}>{t.task}</span>
            <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;