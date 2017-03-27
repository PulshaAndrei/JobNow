
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';

import http from '../utils/http';

const initState = {
  user: {},
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function getUser() {
  return (dispatch) => {
    http.get('/api/user/me').then((res) => {
      dispatch({ type: 'SET_USER', payload: res });
      dispatch(setUnavailableDates(res.unavailableDates || []));
    }, (e) => {
      console.warn(e);
      Actions.loginAndRegister();
    });
  };
}

export function logout() {
  return store.delete('token')
    .then(() => Actions.loginAndRegister());
}
