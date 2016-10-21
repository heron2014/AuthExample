const EMAIL_CHANGED = 'EMAIL_CHANGED';
// action creator
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
}

const INITIAL_STATE = {
  email: ''
};

// reducer
export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    default:
      return state;
  }
}
