import { streams } from '../apis/streams';
import history from '../history';
import {
  FETCH_STREAMS,
  FETCH_STREAM,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  SIGN_IN,
  SIGN_OUT,
} from './types';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const fetchStreams = () => {
  return async (dispatch) => {
    const res = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: res.data });
  };
};

export const fetchStream = (id) => {
  return async (dispatch) => {
    const res = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: res.data });
  };
};

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const res = await streams.post('/streams', { ...formValues, userId });

    dispatch({ type: CREATE_STREAM, payload: res.data });

    // ここで、StreamListに遷移するようにする。
    // TODO：action自体は共通の色が濃いので、component側で制御した方が良いはず。
    history.push('/');
  };
};

export const editStream = (id, formValues) => {
  return async (dispatch) => {
    const res = await streams.put(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: res.data });
  };
};

export const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
  };
};
