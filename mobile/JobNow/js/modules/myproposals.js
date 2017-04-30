import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import moment from 'moment';

import http from '../utils/http';

const initState = {
  jobs: [],
  isLoading: false,
  currentJob: {},
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_MY_PROPOSALS_JOBS':
      return { ...state, jobs: action.payload };
    case 'SET_LOADING_MY_PROPOSALS':
      return { ...state, isLoading: action.payload };
    case 'SET_MY_PROPOSALS_CURRENT_JOB':
      return { ...state, currentJob: action.payload };
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

export function loadJobs() {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    http.get('/users_proposal')
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch({ type: 'SET_MY_PROPOSALS_JOBS', payload: response });
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        console.warn(e);
      });
  };
}
