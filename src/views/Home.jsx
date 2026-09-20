import {useState, useEffect} from 'react';
import MediaRow from '../components/MediaRow';
import fetchData from '../utils/fetchData';

const Home = () => {
  // 1. Create state to hold the fetched media items
  const [mediaArray, setMediaArray] = useState([]);

  // 2. useEffect runs once when the component first mounts
  useEffect(() => {
    const getMedia = async () => {
      try {
        // Fetch the raw list of media items from Metropolia API
        const media = await fetchData(
          import.meta.env.VITE_MEDIA_API + '/media',
        );

        // Fetch the username for each item using user_id via Promise.all
        const mediaWithUsers = await Promise.all(
          media.map(async (item) => {
            const user = await fetchData(
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
            );
            // Return item with the fetched username merged in
            return {...item, username: user.username};
          }),
        );

        // Save the enriched items into state
        setMediaArray(mediaWithUsers);
      } catch (error) {
        console.error('Failed to fetch media:', error);
      }
    };

    getMedia();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <h2>Media List</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
