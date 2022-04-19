import VideoItem from './VideoItem';

const VideoList = ({ videos }) => {
  const renderedList = videos.map((video) => <VideoItem video={video} />);

  return <div>{renderedList}</div>;
};

export default VideoList;
