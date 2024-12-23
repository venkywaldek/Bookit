'use server';
import { createAdminClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
async function createSession(previousState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return {
      error: 'please fill out all fields',
    };
  }

  //Get Account instance
  const { account } = await createAdminClient();
  try {
    //Generate session
    const session = await account.createEmailPasswordSession(email, password);

    //Create cookie
    const cookieStore = await cookies();
    cookieStore.set('appwrite-session', session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(session.expire),
      path: '/',
    });

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
