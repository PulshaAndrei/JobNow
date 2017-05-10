
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import FCM from 'react-native-fcm';

import http from '../utils/http';

import { updateSubscribedCategories } from './settings';

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

const initState = {
  user: {
    givenName: '',
    familyName: '',
    phone: '',
    email: '',
    communicationMethod: 0,
  },
  phone: null,
  confirmationCode: null,
  firstName: null,
  lastName: null,
  email: null,
  communicationMethod: null,
  isLoading: false,
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_PHONE_REGISTRATION':
      return { ...state, phone: action.payload };
    case 'SET_CONFIRMATION_CODE_REGISTRATION':
      return { ...state, confirmationCode: action.payload };
    case 'SET_FIRSTNAME_REGISTRATION':
      return { ...state, firstName: action.payload };
    case 'SET_LASTNAME_REGISTRATION':
      return { ...state, lastName: action.payload };
    case 'SET_CONNECTION_REGISTRATION':
      return { ...state, communicationMethod: action.payload };
    case 'SET_EMAIL_REGISTRATION':
      return { ...state, phone: action.payload };
    case 'SET_LOADING_USER':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function setIsLoading(value) {
  return dispatch => dispatch({ type: 'SET_LOADING_USER', payload: value });
}

export function setPhone(value) {
  return dispatch => dispatch({ type: 'SET_PHONE_REGISTRATION', payload: value });
}

export function setConfirmationCode(value) {
  return dispatch => dispatch({ type: 'SET_CONFIRMATION_CODE_REGISTRATION', payload: value });
}

export function setRegistrationData(value) {
  return dispatch => {
    dispatch({ type: 'SET_FIRSTNAME_REGISTRATION', payload: value.firstName });
    dispatch({ type: 'SET_LASTNAME_REGISTRATION', payload: value.lastName });
    dispatch({ type: 'SET_EMAIL_REGISTRATION', payload: value.email });
    dispatch({ type: 'SET_CONNECTION_REGISTRATION', payload: value.connection });
  }
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
    http.get('/account')
      .then((response) => {
        dispatch({ type: 'SET_USER', payload: response.account });
      })
      .catch((e) => console.warn(e));
  };
}

export function updateUser(user) {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    http.put('/account', user)
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch({ type: 'SET_USER', payload: response.account });
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        Alert.alert(
          'Ошибка сохранения',
          e.response.data.message,
          [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
      });
  };
}

export function login(phone, password) {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    http.post('/auth/login', { username: phone.replace(/\D/g,''), password })
      .then((response) => {
        store.save('token', response.token)
          .then(dispatch(getUser()))
          .then(dispatch(setIsLoading(false)))
          .then(() => Actions.drawer())
          .then(dispatch(sendFcmToken()));
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        Alert.alert(
          'Ошибка авторизации',
          e.response.data.message,
          [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
      });
  };
}

export function sendSms(phone) {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    http.post('/account/phone_confirmation', { phone: phone.replace(/\D/g,'') })
    .then(() => {
      dispatch(setIsLoading(false));
      dispatch(setPhone(phone));
      Actions.phoneConfirmation();
    })
    .catch((e) => {
      dispatch(setIsLoading(false));
      Alert.alert(
        'Ошибка',
        e.response.data.message,
        [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
    });
  }
}

export function confirmActivation(phone, code) {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    http.put('/account/phone_confirmation', { phone: phone.replace(/\D/g,''), code })
    .then(() => {
      dispatch(setIsLoading(false));
      dispatch(setConfirmationCode(code));
      Actions.registration();
    })
    .catch((e) => {
      dispatch(setIsLoading(false));
      dispatch(setConfirmationCode(code));
      Actions.registration();
      // TODO: uncomment in prod
      /*Alert.alert(
        'Ошибка',
        e.response.data.message,
        [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);*/
    });
  }
}

export function registration(user) {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    http.post('/account', user)
    .then((response) => {
      store.save('token', response.token)
      .then(dispatch(getUser()))
      .then(dispatch(updateSubscribedCategories([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true)))
      .then(dispatch(setIsLoading(false)))
      .then(() => Actions.drawer())
      .then(dispatch(sendFcmToken()));
    })
    .catch((e) => {
      dispatch(setIsLoading(false));
      Alert.alert(
        'Ошибка',
        e.response.data.message,
        [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
    });
  }
}

export function logout() {
  return (dispatch, getState) => {
    FCM.getFCMToken()
      .then(token => http.delete('/devices', { token }))
        .then(() => store.delete('token').then(() => Actions.login()))
        .catch(() => store.delete('token').then(() => Actions.login()))
  };
}

export function sendFcmToken() {
  return (dispatch, getState) => {
    FCM.getFCMToken().then((token) => {
      http.post('/devices', { token });
    });
  };
}
