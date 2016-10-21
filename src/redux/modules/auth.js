import firebase from 'firebase';

const EMAIL_CHANGED = 'EMAIL_CHANGED';
const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
const LOGIN_USER_START = 'LOGIN_USER_START';

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
    dispatch({ type: LOGIN_USER_START });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
      });
  };
};

// helper callback function for loginUser only
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

// helper callback function for loginUser only
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL});
}

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

// reducer
export default function authReducer(state = INITIAL_STATE, action) {
  console.log('Actions', action);
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_START:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication failed', password: '', loading: false };
    default:
      return state;
  }
}
