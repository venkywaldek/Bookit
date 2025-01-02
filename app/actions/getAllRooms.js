'use server';

import { createAdminClient } from '@/config/appwrite';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function getAllRooms() {
  try {
    const { databases } = await createAdminClient();

    //Ensure environment variables are properly set
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS;

    if (!databaseId || !collectionId) {
      throw new Error(
        'Missing required environment variables: NEXT_PUBLIC_APPWRITE_DATABASE or NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS  '
      );
    }

    //Fetch rooms
    // const { documents: rooms } = await databases.listDocuments(
    //   process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
    //   process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
    // );

    const response = await databases.listDocuments(databaseId, collectionId);

    if (!response || !response.documents) {
      console.error(
        'Appwrite API returned an invalid response structure:',
        response
      );
      throw new Error('Invalid response structure from appwrite API');
    }

    return response.documents;
    // //Revalidate the cache for this path
    revalidatePath('/', 'layout');

    // return rooms;
  } catch (error) {
    console.log('Failed to get rooms', error);
    //If it's server-side error, redirect to the error page
    if (error?.code === 500) {
      console.error('Server error occurred in Appwrite:', {
        message: error.message,
        response: error.response,
        stack: error.stack,
      });
      redirect('/error');
    } else {
      console.error('Unexpected error:', {
        response: error.response,
        stack: error.stack,
        message: error.message,
      });
    }

    //Re-thor the error for further handling, if needed
    throw error;
  }
}

export async function revalidateRooms() {
  try {
    revalidatePath('/', 'layout');
    console.log('Revalidated path: /');
  } catch (error) {
    console.error('Failed to revalidate path:', error);
    throw error;
  }
}

export default getAllRooms;
