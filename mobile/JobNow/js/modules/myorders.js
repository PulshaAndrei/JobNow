import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import moment from 'moment';

import http from '../utils/http';

const initState = {
  jobs: [],
  isLoading: false,
  currentJob: {
    bets: [],
  },
  newJob: {
    name: '',
    description: '',
    address: '',
    startWork: moment().unix(),
    endWork: moment().unix(),
    priceTo: '',
    allDay: false,
    categoryId: 0,
    locationCoordX: null,
    locationCoordY: null,
    isEnabledGeolocation: true,
  }
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_MY_ORDERS_JOBS':
      return { ...state, jobs: action.payload };
    case 'SET_LOADING_MY_ORDERS':
      return { ...state, isLoading: action.payload };
    case 'SET_NEW_JOB':
      return { ...state, newJob: action.payload };
    case 'SET_MY_ORDERS_CURRENT_JOB':
      return { ...state, currentJob: action.payload };
    default:
      return state;
  }
}

export function setIsLoading(value) {
  return dispatch => dispatch({ type: 'SET_LOADING_MY_ORDERS', payload: value });
}

export function setNewJob(value) {
  return dispatch => dispatch({ type: 'SET_NEW_JOB', payload: value });
}

export function setCurrentJob(value) {
  return dispatch => dispatch({ type: 'SET_MY_ORDERS_CURRENT_JOB', payload: value });
}

export function loadJobs() {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    http.get('/users_order')
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch({ type: 'SET_MY_ORDERS_JOBS', payload: response });
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        console.warn(e);
      });
  };
}

export function saveJob() {
  return (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const data = getState().myorders.newJob;
    data.priceTo = parseFloat(data.priceTo);
    if (!data.isEnabledGeolocation) {
      data.locationCoordX = null;
      data.locationCoordY = null;
    }
    console.warn('', data);
    http.post('/users_order', data)
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch(setNewJob(initState.newJob));
        dispatch(loadJobs());
        Alert.alert(
          'Поздравляем!',
          `Заказ «${response.name}» успешно создан! \nПолучили уведомления - Х человек.`,
          [{ text: 'OK', onPress: Actions.pop, style: 'cancel' }]);
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        Alert.alert(
          'Ошибка при создании',
          e.response.data.message,
          [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
      });
  };
}

export function loadCurrentJob() {
  return (dispatch, getState) => {
    dispatch(setIsLoading(true));
    http.get(`/users_order/${getState().myorders.currentJob.id}`)
      .then((response) => {
        console.warn(response);
        dispatch(setIsLoading(false));
        dispatch(setCurrentJob(response));
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        console.warn(e);
      });
  };
}

export function closeJob() {
  return (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const id = getState().myorders.currentJob.id;
    http.del(`/users_order/${id}`)
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch(loadJobs());
        Alert.alert(
          'Завершено',
          `Заказ удален успешно.`,
          [{ text: 'OK', onPress: Actions.pop, style: 'cancel' }]);
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        Alert.alert(
          'Ошибка при удалении',
          e.response.data.message,
          [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
      });
  };
}
