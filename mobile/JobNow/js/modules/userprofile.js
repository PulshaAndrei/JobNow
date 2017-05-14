import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import moment from 'moment';

import http from '../utils/http';

const initState = {
  user: {},
  reviews: [],
  isLoading: false,
  createAction: '',
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_USER_USER_PROFILE':
      return { ...state, user: action.payload };
    case 'SET_LOADING_USER_PROFILE':
      return { ...state, isLoading: action.payload };
    case 'SET_REVIEWS_USER_PROFILE':
      return { ...state, reviews: action.payload };
    case 'SET_REVIEWS_CREATE_ACTION':
      return { ...state, createAction: action.payload };
    default:
      return state;
  }
}

export function setIsLoading(value) {
  return dispatch => dispatch({ type: 'SET_LOADING_USER_PROFILE', payload: value });
}

export function setCurrentUser(value) {
  return dispatch => dispatch({ type: 'SET_USER_USER_PROFILE', payload: value });
}

export function setReviews(value) {
  return dispatch => dispatch({ type: 'SET_REVIEWS_USER_PROFILE', payload: value });
}

export function setCreateAction(value) {
  return dispatch => dispatch({ type: 'SET_REVIEWS_CREATE_ACTION', payload: value });
}

export function loadUser(userId, createAction) {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    http.get(`/user/${userId}`)
      .then((response) => {
        dispatch(setCurrentUser(response));
        dispatch(setCreateAction(createAction));
        dispatch(loadReviews());
        dispatch(setIsLoading(false));
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        console.warn(e);
      });
  };
}

export function loadReviews() {
  return (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const userId = getState().userprofile.user.id;
    http.get(`/review/${userId}`)
      .then((response) => {
        console.warn('reviews: ', response);
        dispatch(setReviews(response));
        dispatch(setIsLoading(false));
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        console.warn(e);
      });
  };
}

export function createReview(rate, text) {
  return (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const userId = getState().userprofile.user.id
    http.post(`/review/${userId}`, { title: ' ', text, rate })
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch(loadUser(userId));
        Alert.alert(
          'Поздравляем!',
          `Ваш отзыв успешно отправлен.`,
          [{ text: 'OK', onPress: Actions.pop, style: 'cancel' }]);
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        Alert.alert(
          'Ошибка',
          e.response.data.message,
          [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
      });
  };
}
