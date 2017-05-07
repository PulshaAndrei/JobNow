import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import moment from 'moment';

import http from '../utils/http';
import { loadJobs } from './searchorders';
import { loadJobs as myProposalsLoadJobs } from './myproposals';

const initState = {
  job: {},
  isLoading: false,
  fromScreen: '',
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_LOADING_ORDER_DETAILS':
      return { ...state, isLoading: action.payload };
    case 'SET_ORDER_DETAILS_JOB':
      return { ...state, job: action.payload };
    case 'SET_ORDER_DETAILS_FROM_SCREEN':
      return { ...state, fromScreen: action.payload };
    default:
      return state;
  }
}

export function setIsLoading(value) {
  return dispatch => dispatch({ type: 'SET_LOADING_ORDER_DETAILS', payload: value });
}

export function setJob(value) {
  return dispatch => dispatch({ type: 'SET_ORDER_DETAILS_JOB', payload: value });
}

export function setFromScreen(value) {
  return dispatch => dispatch({ type: 'SET_ORDER_DETAILS_FROM_SCREEN', payload: value });
}

export function loadJob(jobId) {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    http.get(`/order/${jobId}`)
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch(setJob(response));
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        console.warn(e);
      });
  };
}

export function sendProposal(value) {
  return (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const jobId = getState().orderdetails.job.id;
    http.post(`/users_proposal/${jobId}`, { proposal: value })
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch(loadJob(jobId));
        dispatch(loadJobs());
        dispatch(myProposalsLoadJobs());
        Alert.alert(
          'Поздравляем!',
          `Ваш отклик отправлен.`,
          [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
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

export function changeProposal(value) {
  return (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const jobId = getState().orderdetails.job.id;
    http.put(`/users_proposal/${jobId}`, { proposal: value })
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch(loadJob(jobId));
        dispatch(loadJobs());
        dispatch(myProposalsLoadJobs());
        Alert.alert(
          'Поздравляем!',
          `Ваш отклик отправлен.`,
          [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
      })
      .catch((e) => {
        console.warn(e);
        dispatch(setIsLoading(false));
        Alert.alert(
          'Ошибка',
          e.response.data.message,
          [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
      });
  };
}

export function removeProposal() {
  return (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const jobId = getState().orderdetails.job.id;
    http.del(`/users_proposal/${jobId}`)
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch(loadJob(jobId));
        dispatch(loadJobs());
        dispatch(myProposalsLoadJobs());
        Alert.alert(
          'Завершено',
          `Ваш отклик удален.`,
          [{ text: 'OK', onPress: () => {}, style: 'cancel' }]);
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
