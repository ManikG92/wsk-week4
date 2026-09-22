import {useState, useEffect} from 'react';
import fetchData from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const media = await fetchData(
          import.meta.env.VITE_MEDIA_API + '/media',
        );

        const mediaWithUsers = await Promise.all(
          media.map(async (item) => {
            const user = await fetchData(
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
            );
            return {...item, username: user.username};
          }),
        );

        setMediaArray(mediaWithUsers);
      } catch (error) {
        console.error('Failed to fetch media in useMedia:', error);
      }
    };

    getMedia();
  }, []);

  return {mediaArray};
};

export {useMedia};
