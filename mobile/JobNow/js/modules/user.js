
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import http from '../utils/http';

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

const initState = {
  user: {},
  isLoading: false,
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING_USER':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function setIsLoading(value) {
  return dispatch => dispatch({ type: 'SET_LOADING_USER', payload: value });
}

export function phoneMask(value) {
  value = value.replace(/\D/g,'');
  if (value[0] === '3') value = value.slice(1);
  if (value[0] === '7') value = value.slice(1);
  if (value[0] === '5') value = value.slice(1);
  value = '+375 ' + value;
  if (value.length > 5) value = value.insert(5, "(");
  if (value.length > 8) value = value.insert(8, ") ");
  if (value.length > 13) value = value.insert(13, " ");
  return value;
}

export function getUser() {
  return (dispatch) => {
    http.get('/api/user/me').then((res) => {
      dispatch({ type: 'SET_USER', payload: res });
    }, (e) => {
      console.warn(e);
    });
  };
}

export function login(phone, password) {
  return (dispatch) => {
    console.warn('!!!');
    dispatch(setIsLoading(true));
    http.post('/auth/login', { username: phone.replace(/\D/g,''), password }).then((resLogin) => {
      store.save('token', resLogin.id)
        //.then(store.save('user_id', resLogin.userId))
        .then(dispatch(setUser(resLogin.user)))
        .then(dispatch(setIsLoading(false)))
        .then(() => Actions.drawer())
        .then(dispatch(sendFcmToken()));
    }).catch((e) => {
      dispatch(setIsLoading(false));
      Alert.alert(
        'Ошибка авторизации',
        e.response.data.message,
        [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
    });
  };
}

export function logout() {
  return store.delete('token')
    .then(() => Actions.login());
}
