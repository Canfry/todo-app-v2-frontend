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
    <>
      <div className='w-full h-full dark:bg-slate-900 text-neutral-300'>
        <div className='w-[80%] mx-auto flex flex-col items-start h-full py-8 '>
          <h1 className='text-5xl'>My todos</h1>
          <hr className='w-full h-[2px] bg-slate-900 dark:bg-neutral-300 my-8' />
          {todos?.length === 0 ? (
            <p>There is no todos</p>
          ) : (
            todos?.map((todo) => <li key={todo.id}>{todo.description}</li>)
          )}
        </div>
      </div>
    </>
  );
}
