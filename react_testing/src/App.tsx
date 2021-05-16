import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [text, setText] = useState('Hello World!');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
        if (isMounted) {
          setTodos(response.data.filter(todo => todo.userId === 1));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const onClick = () => {
    setTimeout(() => {
      setText('New text');
    }, 100);
  };

  const filtered = showCompleted ? todos.filter(todo => todo.completed) : todos;

  return (
    <div className='App'>
      {text}
      <button onClick={onClick}>Change Text</button>

      <ul>
        {filtered.map(todo => (
          <li key={todo.id} data-testid='todo'>
            {todo.title}
          </li>
        ))}
      </ul>

      <button onClick={() => setShowCompleted(!showCompleted)}>Toggle</button>
    </div>
  );
};

export default App;
