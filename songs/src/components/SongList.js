import React from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

class SongList extends React.Component {
  renderList() {
    return this.props.songs.map((song) => {
      return (
        <div key={song.title} className="item">
          <div className="right floated content">
            <button
              onClick={() => this.props.selectSong(song)}
              className="ui button primary"
            >
              Select
            </button>
          </div>
          <div className="content">{song.title}</div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  console.log('STATE', state);

  /**
   * ・stateはreduxのstate
   * ・songs: state.songsの左側のsongsはpropsの名前
   */
  return {
    songs: state.songs,
  };
};

/**
 * ・mapStateToPropsで、reduxのどのstateをpropsに紐づけるかを決める。
 * ・connectは親玉であるproviderとのつなぎ役をやってくれる。
 */
export default connect(mapStateToProps, { selectSong })(SongList);
