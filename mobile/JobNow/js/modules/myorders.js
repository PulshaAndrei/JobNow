import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import moment from 'moment';

import http from '../utils/http';

const initState = {
  jobs: [],
  isLoading: false,
  newJob: {
    name: '',
    description: '',
    address: '',
    startWork: moment().unix(),
    endWork: moment().unix(),
    priceTo: '',
    isAllDay: false,
    categoryId: 0,
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
    console.warn('', data);
    http.post('/users_order', data)
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch(setNewJob(initState.newJob));
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
