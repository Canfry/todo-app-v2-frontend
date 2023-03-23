import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

export interface Todo {
  id: string;
  description: string;
  status: string;
}

export type TodoList = Todo[];

export default function Todos() {
  const [todos, setTodos] = useState<TodoList | undefined>();

  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem('user') || '');

  async function getTodos(): Promise<TodoList | undefined> {
    try {
      const response = await axios.get<TodoList>(
        'http://localhost:5500/todos',
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setTodos(response.data);

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      // alert(err?.response.data);
    }
  }

  // async function createTodo(): Promise<Todo | undefined> {
  //   try {
  //     const response = await axios.post<TodoList>(
  //       'http://localhost:5500/todos/new',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token.access_token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     setTodos(response.data);

  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     const err: any = error;
  //     alert(err?.response.data);
  //   }
  // }

  useEffect(() => {
    getTodos();
  }, []);

  function handleClick() {
    if (token) {
      navigate('/todos/new');
    }
  }

  function signOut() {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <>
      {/* {AxiosError ? (
        <div className='w-full h-full dark:bg-slate-900 dark:text-neutral-300 text-slate-900'>
          <div className='w-[80%] mx-auto text-center pt-10'>
            <h1 className='text-4xl'>ERROR CODE: 401</h1>
            <h2 className='dark:text-white'>
              You're not authorized to access this page
            </h2>
            <div className='flex justify-center gap-8 mt-8'>
              <button
                onClick={() => navigate('/login')}
                className='bg-slate-700 text-white text-xl py-2 px-4 rounded-md hover:bg-slate-600'
              >
                Signin
              </button>
              <button
                onClick={() => navigate('/register')}
                className='bg-slate-700 text-white text-xl py-2 px-4 rounded-md hover:bg-slate-600'
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      ) : ( */}
      <div className='w-full h-full dark:bg-slate-900 dark:text-neutral-300 text-slate-900'>
        <div className='w-[80%] mx-auto flex justify-end'>
          <button
            onClick={signOut}
            className='flex items-center gap-2 border border-slate-600 rounded-md py-1 px-2'
          >
            <FaSignOutAlt />
            Signout
          </button>
        </div>
        <div className='w-[80%] mx-auto flex flex-col items-start h-full py-8 '>
          <div className='flex items-center justify-between w-full'>
            <h1 className='text-5xl'>My todos</h1>
            <button
              className='bg-slate-700 text-white h-[70%] px-2 rounded-md hover:bg-slate-600 text-sm'
              onClick={handleClick}
            >
              Create Todo
            </button>
          </div>
          <hr className='w-full h-[2px] bg-slate-900 dark:bg-neutral-300 my-8' />
          {todos?.length === 0 ? (
            <p>There is no todos</p>
          ) : (
            todos?.map((todo) => <li key={todo.id}>{todo.description}</li>)
          )}
        </div>
      </div>
      {/* )} */}
    </>
  );
}
