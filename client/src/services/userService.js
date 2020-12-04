import axios from 'axios';

import config from '../config/config.json';
import { authHeader, handleResponse } from '../helpers';

const apiUrl =
  process.env.NODE_ENV !== 'production' ? config.apiUrl : config.apiUrlProd;

async function getAll() {
  const header = await authHeader();
  return axios
    .get(`${apiUrl}/users/allusers`, { headers: header })
    .then((res) => handleResponse(res))
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
      return res;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
}

async function update(id, user) {
  const header = await authHeader();
  return axios
    .put(`${apiUrl}/users/user`, { id, user }, { headers: header })
    .then((res) => handleResponse(res))
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
}

async function updateOne(id, user) {
  const header = await authHeader();
  return axios
    .put(`${apiUrl}/users/user/account`, { id, user }, { headers: header })
    .then((res) => handleResponse(res))
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
}

async function deleteUser(id) {
  const header = await authHeader();
  return axios
    .delete(`${apiUrl}/users/user/${id}`, { headers: header })
    .then((res) => handleResponse(res))
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
}

const userService = {
  update,
  updateOne,
  deleteUser,
  getAll,
  findById
};

export default userService;
