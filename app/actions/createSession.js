'use server';
import { createAdminClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
async function createSession(previousState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return {
      error: 'Please fill out all fields',
    };
  }

  //Get Account instance
  const { account } = await createAdminClient();
  try {
    //Generate session
    const session = await account.createEmailPasswordSession(email, password);

    // Validate session expiration date
    const expireDate = new Date(session.expire);
    if (isNaN(expireDate.getTime())) {
      console.error('Invalid session expiration date:', session.expire);
      return {
        error: 'An error occurred while creating the session. Please try again',
      };
    }

    //Create cookie
    const isDev = process.env.NODE_ENV === 'development';
    const cookieStore = await cookies();

    console.log('Creating cookie with the following settings:', {
      httpOnly: true,
      secure: !isDev,
      sameSite: 'lax',
      expires: expireDate,
      path: '/',
    });

    cookieStore.set('appwrite-session', session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: expireDate,
      path: '/',
    });

    console.log('Session successfully created and cookie set.');

    return {
      success: true,
    };
  } catch (error) {
    console.log('Authentication Error', error);
    //Handle different error types
    if (error.code === 401) {
      return {
        error: 'Invalid credentials. Please check the email and password',
      };
    }

    return {
      error: 'An error occurred during login',
    };
  }
}

export default createSession;
