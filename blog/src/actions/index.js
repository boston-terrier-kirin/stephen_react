import jsonPlaceholder from '../apis/jsonPlaceholder';

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

export const fetchUser = (id) => async (dispatch) => {
  // const res = await jsonPlaceholder.get(`/users/${id}`);
  // dispatch({
  //   type: 'FETCH_USER',
  //   payload: res.data,
  // });
};
