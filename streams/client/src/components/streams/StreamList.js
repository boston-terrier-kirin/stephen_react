import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

const StreamList = (props) => {
  const { fetchStreams } = props;
  useEffect(
    () => {
      fetchStreams();
    },
    /**
     * TODO：fetchStreamsが原因で無限ループするかと思ったけど、そうではない？
     */
    [fetchStreams]
  );

  const renderAdmin = (stream) => {
    if (stream.userId === props.currentUserId) {
      return (
        <div className="right floated content">
          <button className="ui button primary">Edit</button>
          <button className="ui button negative">Delete</button>
        </div>
      );
    }

    return null;
  };

  const renderList = props.streams.map((stream) => {
    return (
      <div className="item" key={stream.id}>
        {renderAdmin(stream)}
        <i className="large middle aligned icon camera" />
        <div className="content">
          {stream.title}
          <div className="description">{stream.description}</div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // Object.valuesにすれば値の一覧がGETできる。
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
