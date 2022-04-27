import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamEdit = (props) => {
  const id = props.match.params.id;
  const { fetchStream } = props;

  useEffect(() => {
    // TODO：useStateを使って、setIsLoadingパターンをやろうとしたけど、fetchStreamをawaitできるわけではないので、仕方なく、prosp.streamで判定。
    fetchStream(id);
  }, [id, fetchStream]);

  // 初回はundefinedになっていて、fetchStreamが終わったらステートが変わって、再度レンダリングが走る。
  console.log(props.stream);

  // TODO：useStateを使って、setIsLoadingパターンをやろうとしたけど、fetchStreamをawaitできるわけではないので、仕方なく、prosp.streamで判定。
  if (!props.stream) {
    return <div>Loading...</div>;
  }

  return <div>{props.stream.title}</div>;
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    stream: state.streams[id],
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);

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
