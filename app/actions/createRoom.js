'use server';

import { createAdminClient } from '@/config/appwrite';
import checkAuth from './checkAuth';
import { ID } from 'nopde-node-appwrite';
import { revalidatePath } from 'next/cache';

async function createRoom(previousState, formData) {
  //Get databases instance
  const { databases } = await createAdminClient();

  try {
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: 'You must be logged in to create a room',
      };
    }
  } catch (error) {}
}

export default createRoom;
