'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
async function destroySession() {
  try {
    //Retrieve the session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('appwrite-session');

    if (!sessionCookie) {
      console.error('Session cookie not found.');
      return {
        error: 'No session cookie found',
      };
    }

    //Initialize the AppWrite client with the session cookie
    const { account } = await createSessionClient(sessionCookie.value);

    //Delete the current session
    await account.deleteSession('current');

    //Clear session cookie
    cookieStore.delete('appwrite-session');
    console.log('Session successfully destroyed.');
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error destroying session:', error);

    //Handle specific errors
    if (error.code === 401) {
      return {
        error: 'Invalid credentials. Please check the email and password',
      };
    }

    return {
      error: 'An error while deleting session',
    };
  }
}

export default destroySession;
