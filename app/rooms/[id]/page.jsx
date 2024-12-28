import getSingleRoom from '@/app/actions/getSingleRoom';
import Heading from '@/components/Heading';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
import BookingForm from '@/components/BookingForm';

const RoomPage = async ({ params }) => {
  const { id } = await params;

  if (!id) {
    //Handle cases where the room is null
    return (
      <div className='p-6 bg-white rounded-lg shadow'>
        <Heading title='Error' />;<p>Room ID is missing or invalid.</p>
      </div>
    );
  }

  //Fetch the room data
  const room = await getSingleRoom(id);
  if (!room) {
    return (
      <div className='p-6  bg-white rounded-lg shadow'>
        <Heading title='Room not found' />
        <p>The room you are looking for does not exist.</p>
        <Link href='/' className='text-blue-500 hover:underline'>
          {' '}
          Go back to the homepage{' '}
        </Link>
      </div>
    );
  }

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;

  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

  const imageSrc = room.image ? imageUrl : '/images/no-image.jpg';

  return (
    <>
      <Heading title={room.name} />

      <div className='bg-white shadow rounded-lg p-6'>
        <Link
          href='/'
          className='flex items-center text-gray-600 hover:text-gray-800 mb-4'
        >
          <FaChevronLeft className='inline mr-1' />
          <span className='ml-2'>Back to Rooms</span>
        </Link>

        <div className='flex flex-col sm:flex-row sm:space-x-6'>
          <Image
            src={imageSrc}
            alt={room.name || 'Default Room'}
            width={400}
            height={100}
            className='w-full sm:w-1/3 h-64 object-cover rounded-lg'
          />

          <div className='mt-4 sm:mt-0 sm:flex-1'>
            <p className='text-gray-600 mb-4'>{room.description}</p>

            <ul className='space-y-2'>
              <li>
                <span className='font-semibold text-gray-800'>Size:</span>{' '}
                {room.sqft} sq ft{' '}
              </li>
              <li>
                <span className='font-semibold text-gray-800'>
                  Availability:
                </span>{' '}
                {room.availability}{' '}
              </li>
              <li>
                <span className='font-semibold text-gray-800'>Price:</span> $
                {room.price_per_hour}/hour{' '}
              </li>
              <li>
                <span className='font-semibold text-gray-800'>Address:</span>{' '}
                {room.address}
              </li>
            </ul>
          </div>
        </div>
        <BookingForm room={room} />
      </div>
    </>
  );
};

export default RoomPage;
