import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const userData = {
    email,
    password,
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function signIn() {
    const response = await axios.post(
      'http://localhost:5500/auth/login',
      userData
    );

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    console.log(response.data);
    return response.data;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn();
    navigate('/todos');
  }

  return (
    <>
      <div className='h-[calc(100vh-160px)] w-full grid place-items-center dark:bg-slate-900 overflow-hidden'>
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
                className='border border-slate-300 mb-8 rounded-md py-1 px-2'
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                value={password}
                name='password'
                className='border border-slate-300 mb-8 rounded-md py-1 px-2'
                onChange={handleChange}
              />
            </div>

            <button
              type='submit'
              className='bg-slate-700 text-white text-xl py-2 px-4 rounded-md'
            >
              Signin
            </button>
          </form>
          <p className='text-center px-2'>
            Don't have an account yet?{' '}
            <Link to='/register' className='text-cyan-500 font-bold'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
