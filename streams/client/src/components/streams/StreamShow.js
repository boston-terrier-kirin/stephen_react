import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = (props) => {
  const id = props.match.params.id;
  const { fetchStream } = props;

  useEffect(() => {
    fetchStream(id);
  }, [id, fetchStream]);

  if (!props.stream) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{props.stream.title}</h1>
      <h3>{props.stream.description}</h3>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    stream: state.streams[id],
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
