import { useState } from 'react';
import { Todo } from './Todos';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type TodoData = {
  description: string;
  status: string;
};

export default function NewTodo() {
  const [formData, setFormData] = useState({
    description: '',
    status: '',
  });

  const { description, status } = formData;

  const todoData: TodoData = {
    description,
    status,
  };

  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem('user') || '');

  const url = `${process.env.API_URL}/todos/new`;

  async function createTodo(): Promise<Todo | undefined> {
    try {
      const response = await axios.post(url, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        },
        data: [
          {
            todoData,
          },
        ],
      });
      if (response.data) {
        return response.data;
      }

      // if (response.data) {
      //   console.log(response.data);
      //   return response.data;
      // }
    } catch (error) {
      console.log(error);
      // alert(err?.response.data);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createTodo();
    navigate('/todos');
  }

  return (
    <div className='w-full h-full dark:bg-slate-900 dark:text-neutral-300 text-slate-900'>
      <div className='w-[80%] mx-auto flex flex-col items-center gap-16 pt-16'>
        <h1 className='text-5xl'>Create a new todo</h1>
        <div className='w-[50%] mx-auto border border-cyan-500 rounded-md py-16 px-32'>
          <form onSubmit={onSubmit} className='flex flex-col gap-6'>
            <div>
              <label htmlFor='Description' className='text-xl'>
                Description:
              </label>
              <br />
              <input
                onChange={handleChange}
                value={description}
                name='description'
                type='text'
                placeholder='Enter a description'
                className='bg-neutral-100 text-slate-900 dark:text-slate-900 py-1 px-2 w-full mt-2'
              />
            </div>
            <div>
              <label htmlFor='status' className='text-xl'>
                Status:
              </label>
              <br />
              <input
                onChange={handleChange}
                value={status}
                name='status'
                type='text'
                placeholder='Enter a status'
                className='bg-neutral-100 text-slate-900 dark:text-slate-900 py-1 px-2 w-full mt-2'
              />
              {/* <select
                value={status}
                name='status'
                className='bg-neutral-100 text-slate-900 py-1 px-2'
              >
                <option value='select'>Select an option</option>
                <option value='linebreak'>-------------</option>
                <option value='new'>New</option>
                <option value='in progress'>In progress</option>
                <option value='finished'>Finished</option>
              </select> */}
            </div>
            <button
              type='submit'
              className='bg-slate-700 text-white text-xl py-2 px-4 rounded-md hover:bg-slate-600'
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
