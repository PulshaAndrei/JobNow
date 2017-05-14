import axios from 'axios';
import config from '../../config';
import store from 'react-native-simple-store';
import { AsyncStorage } from 'react-native';


async function getHeaders() {
  const token = await store.get('token');
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token || '',
  };
}

async function request(url, data, method) {
  const headers = await getHeaders();
  return axios({
    method,
    url: config.origin + url,
    data,
    headers,
  });
}

axios.interceptors.response.use(
  response => response.data,
  (error) => {
    console.warn(JSON.stringify(error));
    if (error.response.status === 401) {
      //_invalidToken();
    }
    return Promise.reject(error);
  }
);

function get(url) {
  return request(url, null, 'GET');
}

function post(url, data) {
  return request(url, data, 'POST');
}

function patch(url, data) {
  return request(url, data, 'PATCH');
}

function del(url) {
  return request(url, null, 'DELETE');
}

function put(url, data) {
  return request(url, data, 'PUT');
}


export default {
  //onInvalidToken,
  get,
  post,
  patch,
  del,
  put,
};
