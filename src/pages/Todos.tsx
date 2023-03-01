import axios from 'axios';
import { useState, useEffect } from 'react';

export interface Todo {
  id: string;
  description: string;
  status: boolean;
}

type TodoList = Todo[];

export default function Todos() {
  const [todos, setTodos] = useState<TodoList | undefined>();

  const token = JSON.parse(localStorage.getItem('user') || '');
  console.log(token.access_token);

  async function getTodos() {
    const response = await axios.get<TodoList>('http://localhost:5500/todos', {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    setTodos(response.data);
    console.log(response.data);

    return response.data;
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {todos?.length === 0 ? (
        <p>There is no todos</p>
      ) : (
        todos?.map((todo) => <li key={todo.id}>{todo.description}</li>)
      )}
    </div>
  );
}
