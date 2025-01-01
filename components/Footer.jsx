const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-gray-100 py-8'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 '>
        <div className='text-center space-y-2'>
          {' '}
          <p className='text-sm text-gray-600'>
            &copy; {currentYear} <strong> Bookit Venkat Kumar. </strong>{' '}
          </p>{' '}
          <p className='text-sm text-gray-600'> All rights reserved. </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
