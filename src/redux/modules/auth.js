import firebase from 'firebase';

const EMAIL_CHANGED = 'EMAIL_CHANGED';
const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

// action creator
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
}

export const loginUser = ({ email, password  }) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
      })
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
        });
      });
  };
};

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null
};

// reducer
export default function authReducer(state = INITIAL_STATE, action) {
  console.log('Actions', action);
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload}
    default:
      return state;
  }
}
