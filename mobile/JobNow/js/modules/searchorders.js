import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import moment from 'moment';

import http from '../utils/http';

const initState = {
  jobs: [],
  isLoading: false,
  currentJob: {},
  selectedCategories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_JOBS':
      return { ...state, jobs: action.payload };
    case 'SET_LOADING_SEARCH_JOB':
      return { ...state, isLoading: action.payload };
    case 'SET_CURRENT_JOB':
      return { ...state, currentJob: action.payload };
    case 'SET_SELECTED_CATEGORIES':
      return { ...state, selectedCategories: action.payload };
    default:
      return state;
  }
}

export function setIsLoading(value) {
  return dispatch => dispatch({ type: 'SET_LOADING_MY_PROPOSALS', payload: value });
}

export function setCurrentJob(value) {
  return dispatch => dispatch({ type: 'SET_MY_PROPOSALS_CURRENT_JOB', payload: value });
}

export function setSelectedCategories(value) {
  return dispatch => dispatch({ type: 'SET_SELECTED_CATEGORIES', payload: value });
}

export function loadJobs() {
  return (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const categories = getState().searchorders.selectedCategories;
    http.get(`/order?categories=${categories}`)
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch({ type: 'SET_JOBS', payload: response });
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        console.warn(e);
      });
  };
}

export function jobsByMonth(currentMonth) {
  return (dispatch, getState) => {
    const allJobs = getState().searchorders.jobs;
    return allJobs.filter(item => moment.unix(item.startWork).diff(currentMonth, 'month') === 0);
  }
}
