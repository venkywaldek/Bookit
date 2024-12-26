'use server';

import { revalidatePath } from 'next/cache';

export async function revalidate(path) {
  try {
    if (!path) throw new Error('Path is required for revalidation.');

    revalidatePath(path);
    console.log(`Revalidated path: ${path}`);
    return { success: true, message: `Revalidated path: ${path} ` };
  } catch (error) {
    console.error('Failed to revalidate path:', error);
    res.status(500).json({ error: 'Failed to revalidate path.' });
  }
}
