const initialState = {
  isSignedin: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, isSignedin: true };
    case 'SIGN_OUT':
      return { ...state, isSignedin: false };
    default:
      return state;
  }
};

export default authReducer;
