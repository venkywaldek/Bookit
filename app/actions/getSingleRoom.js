'use server';

import { createAdminClient } from '@/config/appwrite';
// import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function getSingleRoom(id) {
  //Ensure the ID is provided
  if (!id) {
    console.error('Error:Room ID is missing.');

    return null;
  }
  try {
    const { databases } = await createAdminClient();
    //Fetch rooms
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      id
    );

    // //Revalidate the cache for this path
    // revalidatePath('/', 'layout');

    return room;
  } catch (error) {
    console.log('Failed to get room', error.message || error);
    
    return null;
  }
}

export default getSingleRoom;
