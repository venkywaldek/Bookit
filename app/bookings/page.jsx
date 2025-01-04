import Heading from '@/components/Heading';
import getMyBookings from '../actions/getMyBookings';
import BookedRoomCard from '@/components/BookedRoomCard';

const BookingsPage = async () => {
  const bookings = (await getMyBookings()) || [];
  console.log(bookings);
  if (!Array.isArray(bookings)) {
    return (
      <div>
        <Heading title='My bookings' />
        <p className='text-red-500 mt-4'>
          An error occurred: Unable to load bookings. Please try again later.
        </p>
      </div>
    );
  }
  return (
    <>
      <Heading title='My Bookings' />
      {bookings.length === 0 ? (
        <p className='text-gray-600 mt-4'>You have no bookings </p>
      ) : (
        bookings.map((booking) => (
          <BookedRoomCard key={booking.$id} booking={booking} />
        ))
      )}
    </>
  );
};

export default BookingsPage;
