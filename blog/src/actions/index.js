// import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

/**
 * サマったユーザIDをUserHeader側で取得して何とかするしかないと思っていたけど、
 * ここでまとめてstoreにしれておけば、UserHeader側で取得できる。
 */
export const fetchPostsAndUser =
  () => async (dispatch, getState /* stateを取得できる */) => {
    // postをdispatchする
    await dispatch(fetchPosts());

    // getStateでpostの結果が取得できるので、userIdをサマる
    const userIdSet = new Set();
    getState().posts.forEach((post) => userIdSet.add(post.userId));

    // userをdispatchする
    userIdSet.forEach((userId) => {
      dispatch(fetchUser(userId));
    });
  };

// export const fetchPosts = () => {
//   return async (dispatch, getState) => {
//     const res = await jsonPlaceholder.get('/posts');
//
//     dispatch({
//       type: 'FETCH_POST',
//       payload: res,
//     });
//   };
// };
//  ↓
//  ↓
//  ↓
// export const fetchPosts = () => {
//   return async (dispatch) => {
//     const res = await jsonPlaceholder.get('/posts');
//
//     dispatch({
//       type: 'FETCH_POST',
//       payload: res,
//     });
//   };
// };
//  ↓
//  ↓
//  ↓
export const fetchPosts = () => async (dispatch) => {
  const res = await jsonPlaceholder.get('/posts');

  dispatch({
    type: 'FETCH_POSTS',
    payload: res.data,
  });
};

// ■問題点：ユーザを100回fetchしに行ってしまう。
// export const fetchUser = (id) => async (dispatch) => {
//   const res = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({
//     type: 'FETCH_USER',
//     payload: res.data,
//   });
// };

// ■lodash：ユーザを100回fetchしに行くのを防ぐ方法。これだとユーザ情報が変わった場合に対応できない。
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const res = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({
//     type: 'FETCH_USER',
//     payload: res.data,
//   });
// });

export const fetchUser = (id) => async (dispatch) => {
  const res = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({
    type: 'FETCH_USER',
    payload: res.data,
  });
};
