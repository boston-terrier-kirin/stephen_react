import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

const StreamDelete = (props) => {
  // useParamsでもOK。
  // const id = props.match.params.id;
  const { id } = useParams();
  const { stream, fetchStream, deleteStream } = props;

  useEffect(() => {
    fetchStream(id);
  }, [id, fetchStream]);

  const actions = (
    <>
      <button onClick={() => deleteStream(id)} className="ui button negative">
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </>
  );

  const renderContent = () => {
    // StreamEditとは違って、Modalを先に表示するために、ひと工夫。
    if (!stream) {
      return 'Are your sure want to delete this stream?';
    }

    return `Are your sure want to delete ${stream.title} ?`;
  };

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={actions}
      onDismiss={() => history.push('/')}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    stream: state.streams[id],
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
