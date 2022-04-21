import { useEffect, useState } from 'react';
import youtube from '../apis/youtube';

const useVideos = (defaultSearchTerm) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log('useVideos.useEffect');

    search(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const search = async (term) => {
    console.log('useVideos.search');

    const res = await youtube.get('/search', { params: { q: term } });
    setVideos(res.data.items);
  };

  return [videos, search];
};

export default useVideos;
