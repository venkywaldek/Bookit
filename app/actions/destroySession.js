'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
async function destroySession() {
  const sessionCookie = (await cookies()).get('appwrite-session');
  if (!sessionCookie) {
    return {
      error: 'No session cookie found',
    };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);

    //Delete session
    await account.deleteSession('current');

    //Clear session cookie
    cookies().delete('appwrite-session');
    return {
      success: true,
    };
  } catch (error) {
    //Handle different error types
    if (error.code === 401) {
      return {
        error: 'Invalid credentials. Please check the email and password',
      };
    }

    return {
      error: 'An error deleting session',
    };
  }
}

export default destroySession;
