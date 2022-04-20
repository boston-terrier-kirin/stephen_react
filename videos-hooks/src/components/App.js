import React, { useEffect, useState } from 'react';
import youtube from '../apis/youtube';
import SearchBar from './SearchBar';
import VideoDetail from './VideoDetail';
import VideoList from './VideoList';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    onTermSubmit('NBA Playoffs 2022');
  }, []);

  const onTermSubmit = async (term) => {
    const res = await youtube.get('/search', { params: { q: term } });

    setVideos(res.data.items);
    setSelectedVideo(res.data.items[0]);
  };

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="ui container">
      <SearchBar onFormSubmit={onTermSubmit} />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList videos={videos} onVideoSelect={onVideoSelect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
