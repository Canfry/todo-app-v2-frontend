import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const userData = {
    email,
    password,
  };

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(email, password);
  }

  // const url = 'http://localhost:5500/auth/login';
  const url =
    'https://railway.app/project/9da80383-7567-46e3-a73f-38c7a4c12676/service/00b686a2-a4db-4604-a39a-93079dbcb431?id=663ca37d-74d5-4592-ba48-01dc2f70182c';

  async function signIn() {
    try {
      const response = await axios.post(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: [userData],
      });

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/todos');
      }

      console.log(response.data);
      // return response.data;
    } catch (error: AxiosError | any) {
      console.log(error.message);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn();
  }

  return (
    <>
      <div className='h-[calc(100vh-160px)] w-full grid place-items-center dark:bg-slate-900'>
        <div className=' mt-20 py-20 px-20 flex flex-col gap-8 w-[50%] m-auto border border-neutral-300 dark:bg-slate-900/80 dark:border dark:border-cyan-300 rounded-md text-slate-700 dark:text-neutral-50'>
          <h1 className='text-center text-4xl'>LOGIN</h1>
          <form
            className='flex flex-col items-center w-full'
            onSubmit={onSubmit}
          >
            <div className='flex flex-col'>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                value={email}
                name='email'
                className='border border-slate-300 mb-8 rounded-md py-1 px-2 dark:text-slate-900'
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                value={password}
                name='password'
                className='border border-slate-300 mb-8 rounded-md py-1 px-2 dark:text-slate-900'
                onChange={handleChange}
                required
              />
            </div>

            <button
              type='submit'
              className='bg-slate-700 text-white text-xl py-2 px-4 rounded-md hover:bg-slate-600 '
            >
              Signin
            </button>
          </form>
          <p className='text-center px-2'>
            Don't have an account yet?{' '}
            <Link to='/register' className='text-cyan-500 hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
