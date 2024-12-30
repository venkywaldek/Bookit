'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { DateTime } from 'luxon';

//Convert a data string to a Luxon DateTime object in UTC
function toUTCDateTime(dateString) {
  return DateTime.fromISO(dateString, { zone: 'utc' }).toUTC();
}

//Check if two date ranges overlap
function dateRangesOverlap(checkInA, checkOutA, checkInB, checkOutB) {
  return checkInA < checkOutB && checkOutA > checkInB;
}

//Check room availability
async function checkRoomAvailability({ roomId, checkIn, checkOut }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }
  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    const checkInDateTime = toUTCDateTime(checkIn);
    const checkOutDateTime = toUTCDateTime(checkOut);

    //Fetch all bookings for  a  given room
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal('room_id', roomId)]
    );

    // check for  overlapping bookings
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
        return false; //Overlap found, do not book
      }
    }
    //No overlap found continue to book
    return true;
  } catch (error) {
    console.log('Failed to check availability', error);
    return {
      error: 'Failed to check availability',
    };
  }
}

export default checkRoomAvailability;
