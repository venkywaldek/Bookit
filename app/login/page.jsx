'use client';
import Link from 'next/link';
import { useEffect, useActionState } from 'react';
import { toast } from 'react-toastify';
import createSession from '../actions/createSession';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
const LoginPage = () => {
  const [state, formAction] = useActionState(createSession);
  const { IsAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
      console.error('Login Error:', state.error);
    }
    if (state?.success) {
      toast.success('Logged in successfully');
      setIsAuthenticated(true);

      //Navigate to the homepage after successful login
      setTimeout(() => {
        console.log('Navigating to home...');
        router.push('/');
      }, 100); //Slight delay for state update propgation
    }
  }, [state, setIsAuthenticated, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formAction(formData); //call the action with the form data
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20'>
        <form onSubmit={handleSubmit}>
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
              required
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
