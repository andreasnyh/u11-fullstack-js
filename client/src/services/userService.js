/* eslint-disable import/no-cycle */
import config from '../config/config.json';
import { authHeader, handleResponse } from '../helpers';

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

const userService = {
  getAll
};

export default userService;
