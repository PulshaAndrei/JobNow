import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import moment from 'moment';

import http from '../utils/http';

const initState = {
  subscribedCategories: [],
  isLoading: false,
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_SUBSCRIBED_CATEGORIES':
      return { ...state, subscribedCategories: action.payload };
    case 'SET_LOADING_SETTINGS':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function setIsLoading(value) {
  return dispatch => dispatch({ type: 'SET_LOADING_SETTINGS', payload: value });
}

export function setSubscribedCategories(value) {
  return dispatch => dispatch({ type: 'SET_SUBSCRIBED_CATEGORIES', payload: value });
}

export function loadSubscribedCategories() {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    http.get('/subscription/categories')
      .then((response) => {
        console.warn('', response);
        dispatch(setIsLoading(false));
        dispatch(setSubscribedCategories(response));
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        console.warn(e);
      });
  };
}

export function updateSubscribedCategories(categories, withoutAlert) {
  return (dispatch) => {
    console.warn('updare cat');
    dispatch(setIsLoading(true));
    http.put('/subscription/categories', { categories })
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch(loadSubscribedCategories());
        if (!withoutAlert) Alert.alert(
          'Завершено успешно',
          `Подписка на получение уведомлений о новых заказах изменена.`,
          [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        if (!withoutAlert) Alert.alert(
          'Ошибка при сохранении',
          e.response.data.message,
          [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
      });
  };
}
