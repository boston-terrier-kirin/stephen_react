import {
  FETCH_STREAMS,
  FETCH_STREAM,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from '../actions/types';

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      const streams = {};
      action.payload.forEach((stream) => {
        streams[stream.id] = stream;
      });
      return { ...state, ...streams };
    case FETCH_STREAM:
      // 1件返すのかと錯覚していたけど、state(Object)を最新化するのが正しい。
      // TODO：1件SELECTする場合はどうなるんだ？
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      // const newState = { ...state };
      // newState[action.payload.id] = action.payload;
      // return newState;
      //   ↓
      // 省略形
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      const newState = [...state];
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default streamReducer;
