import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import moment from 'moment';

import http from '../utils/http';

import { loadJobs as myProposalsLoadJobs } from './myproposals';

const initState = {
  jobs: [],
  isLoading: false,
  selectedCategories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_JOBS':
      return { ...state, jobs: action.payload };
    case 'SET_LOADING_SEARCH_JOB':
      return { ...state, isLoading: action.payload };
    case 'SET_SELECTED_CATEGORIES':
      return { ...state, selectedCategories: action.payload };
    default:
      return state;
  }
}

export function setIsLoading(value) {
  return dispatch => dispatch({ type: 'SET_LOADING_SEARCH_JOB', payload: value });
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
    const month = currentMonth.format('YYYY-MM');
    return allJobs
      .filter(item => moment.unix(item.startWork).format('YYYY-MM') === month)
      .filter(item => moment.unix(item.startWork).isSameOrAfter(moment()))
      .sort((a, b) => a.startWork - b.startWork).slice();
  }
}
