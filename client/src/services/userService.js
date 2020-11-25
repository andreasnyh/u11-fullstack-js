import axios from 'axios';

import config from '../config/config.json';
import { authHeader, handleResponse } from '../helpers';

const apiUrl =
  process.env.NODE_ENV !== 'production' ? config.apiUrl : config.apiUrlProd;

async function getAll() {
  const header = await authHeader();
  return axios
    .get(`${apiUrl}/users/allusers`, { headers: header })
    .then(handleResponse)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
}

async function findById(id) {
  const header = await authHeader();
  return axios
    .post(`${apiUrl}/users/`, { userId: id }, { headers: header })
    .then((res) => handleResponse(res))
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
}

const userService = {
  getAll,
  findById
};

export default userService;
