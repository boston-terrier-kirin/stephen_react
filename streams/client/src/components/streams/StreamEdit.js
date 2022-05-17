import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = (props) => {
  const id = props.match.params.id;
  const { fetchStream } = props;

  useEffect(() => {
    // TODO：useStateを使って、setIsLoadingパターンをやろうとしたけど、fetchStreamをawaitできるわけではないので、仕方なく、prosp.streamで判定。
    fetchStream(id);
  }, [id, fetchStream]);

  // ブラウザをリフレッシュした場合、初回はundefinedになっていて、fetchStreamが終わったらステートが変わって、再度レンダリングが走る。
  // console.log(props.stream);

  // TODO：useStateを使って、setIsLoadingパターンをやろうとしたけど、fetchStreamをawaitできるわけではないので、仕方なく、prosp.streamで判定。
  if (!props.stream) {
    return <div>Loading...</div>;
  }

  // initialValuesにidとuserIdを含めた状態にしていると、APIにidとuserIdありでPUTしてしまう。
  // API仕様的には、titleとdescriptionが欲しい。
  const onSubmit = (formValues) => {
    props.editStream(props.stream.id, formValues);
  };

  // initialValuesにidとuserIdを含めた状態にしていると、APIにidとuserIdありでPUTしてしまう。
  // API仕様的には、titleとdescriptionが欲しいので、initialValuesはtitleとdescriptionに絞る。
  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={{
          title: props.stream.title,
          description: props.stream.description,
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    stream: state.streams[id],
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);

/**
 * StreamListから遷移する場合、URLのidでstoreを見に行けば手っ取り早い。
 *
 * ■問題点
 * 　これだとブラウザリフレッシュ(URL入力でも)でstreamがundefinedになる。
 * 　⇒reduxのstoreが空っぽなので。
 * 　　ブックマークする場合もあるので、React Routerではコンポーネントのデータは自分でGETする設計にするのが正しい。
 */
// const mapStateToProps = (state, ownProps) => {
//   const id = ownProps.match.params.id;
//   return {
//     stream: state.streams[id],
//   };
// };
//
// export default connect(mapStateToProps)(StreamEdit);
