'use client';
import Link from 'next/link';
import { useEffect, useActionState, useState } from 'react';
import { toast } from 'react-toastify';
import createSession from '../actions/createSession';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [state, action] = useActionState(createSession);
  const router = useRouter();
  //State to track the login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    } else if (state?.success) {
      toast.success('Logged in successfully');
      //Only use router.push when the component is fully mounted
      setIsLoggedIn(true);
    }
  }, [state]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20'>
        <form action={action}>
          <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
            Login
          </h2>

          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 font-bold mb-2'
            >
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='border rounded w-full py-2 px-3'
              autoComplete='email'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-gray-700 font-bold mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='border rounded w-full py-2 px-3'
              required
            />
          </div>

          <div className='flex flex-col gap-5'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
              Login
            </button>

            <p className='text-sm text-center text-gray-600'>
              Don't have an account?{' '}
              <Link href='/register' className='text-blue-500 hover:underline'>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
