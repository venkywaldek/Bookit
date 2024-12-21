import getAllRooms from './actions/getAllRooms';
import RoomCard from '@/components/RoomCard';
import Heading from '@/components/Heading';
export default async function Home() {

  const rooms = await getAllRooms();
  console.log('Database ID:', process.env.NEXT_PUBLIC_APPWRITE_DATABASE);
  console.log(
    'Collection ID:',
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
  );
  
  return (
    <>
      <Heading title='Available Rooms' />
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard key={room.$id} room={room} />)
      ) : (
        <p>No rooms available at the moment</p>
      )}
    </>
  );
}
