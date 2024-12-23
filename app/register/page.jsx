import Link from "next/link";
const RegisterPage = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20'>
        <form action=''>
          <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
            Register
          </h2>

          <div className='mb-4'>
            <label htmlFor='' className='block text-gray-700 font-bold mb-2'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='border rounded w full py-2 px-3'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='border rounded w full py-2 px-3'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='' className='block text-gray-700 font-bold mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='border rounded w full py-2 px-3'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='' className='block text-gray-700 font-bold mb-2'>
             Confirm Password
            </label>
            <input
              type='password'
              id='password'
              name='confirm-password'
              className='border rounded w full py-2 px-3'
              required
            />
          </div>

          <div className='flex flex-col gap-5'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
              Register
            </button>

            <p>
              Have an account? <span className='mr-1'></span>
              <Link href='/login' className='text-blue-500'>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
