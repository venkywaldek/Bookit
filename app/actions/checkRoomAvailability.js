'use server';

import { createSessionClient } from '@/config/appwrite';

import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { DateTime } from 'luxon';

//Convert a date string to a Luxon DateTime object in UTC

function toUTCDateTime(dateString) {
  return DateTime.fromISO(dateString, { zone: 'utc' }).toUTC();
}

//Check for  overlapping data ranges
function dateRangesOverlap(checkInA, checkOutA, checkInB, checkOutB) {
  return checkInA < checkOutB && checkOutA > checkInB;
}

async function checkRoomAvailability(roomId, checkIn, checkOut) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);
    const checkInDateTime = toUTCDateTime(checkIn);
    const checkOutDateTime = toUTCDateTime(checkOut);

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal('room_id', roomId)]
    );

    const bookings = response.documents|| []
    //Loop over bookings and check for overlaps

    for (const booking of bookings) {
      const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
      const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);

      if (
        dateRangesOverlap(
          checkInDateTime,
          checkOutDateTime,
          bookingCheckInDateTime,
          bookingCheckOutDateTime
        )
      ) {
        return false;
      }
    }

    //No Overlap found continue to book
    return true;
  } catch (error) {
    console.log('Failed to check availability', error);
    return {
      error: 'Failed to check availability',
    };
  }
}

export default checkRoomAvailability;
