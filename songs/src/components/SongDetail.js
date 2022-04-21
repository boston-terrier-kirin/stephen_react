import { connect } from 'react-redux';

/**
 * {song}は、mapStateToPropsでpropsに入ったsongを参照している。
 */
const SongDetail = ({ song }) => {
  if (!song) {
    return <div>Select a Song</div>;
  }
  return (
    <div>
      <h3>Details for:</h3>
      <p>{song.title}</p>
      <p>{song.duration}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    song: state.selectedSong,
  };
};

export default connect(mapStateToProps)(SongDetail);
