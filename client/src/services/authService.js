/* eslint-disable import/no-cycle */
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

import config from '../config/config.json';
import { handleResponse } from '../helpers';

const currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));

function signin(input) {
  axios
    .post(`${config.apiUrl}/auth/signin`, input)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);
      window.location = `${window.location.origin}/home`;
    })
    .catch((error) => {
      if (error.response) {
        const errorArray = [];
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        error.response.data.errors.forEach((err) => {
          console.log('status:', error.response.status, '\nparam:', err.param, '\nError:', err.msg);
          errorArray.push({ param: err.param, msg: err.msg });
        });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  window.location = `${window.location.origin}/signout`;
  currentUserSubject.next(null);
}

async function currentUserValueAsync() {
  return currentUserSubject.value;
}

const authService = {
  signin,
  logout,
  currentUserValueAsync,
  get currentUserValue() {
    return currentUserSubject.value;
  },
  currentUser: currentUserSubject.asObservable()
};

export default authService;
