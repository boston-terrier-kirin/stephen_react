import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

const StreamList = (props) => {
  const { fetchStreams } = props;

  useEffect(
    () => {
      // console.log('StreamList.useEffect');
      fetchStreams();
    },
    /**
     * TODO：fetchStreamsが原因で無限ループするかと思ったけど、そうではない？
     */
    [fetchStreams]
  );

  const renderEditDeleteButton = (stream) => {
    if (props.currentUserId && stream.userId === props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }

    return null;
  };

  const renderList = props.streams.map((stream) => {
    return (
      <div className="item" key={stream.id}>
        {renderEditDeleteButton(stream)}
        <i className="large middle aligned icon camera" />
        <div className="content">
          <Link to={`/streams/${stream.id}`} className="header">
            {stream.title}
          </Link>
          <div className="description">{stream.description}</div>
        </div>
      </div>
    );
  });

  const renderCreateLink = () => {
    if (props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList}</div>
      {renderCreateLink()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // Object.valuesにすれば値の一覧がGETできる。
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
