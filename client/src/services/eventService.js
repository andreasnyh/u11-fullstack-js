import axios from 'axios';

import config from '../config/config.json';
import { authHeader, handleResponse } from '../helpers';

const apiUrl =
  process.env.NODE_ENV !== 'production' ? config.apiUrl : config.apiUrlProd;

async function create(event) {
  const header = await authHeader();
  axios
    .post(`${apiUrl}/event/`, event, { headers: header })
    .then(handleResponse)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
}

async function getAll() {
  const header = await authHeader();
  return axios
    .get(`${apiUrl}/event`, { headers: header })
    .then((res) => handleResponse(res))
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
}

async function getRoomEvents(id) {
  const header = await authHeader();
  return axios
    .get(`${apiUrl}/event/room/${id}`, { headers: header })
    .then((res) => handleResponse(res))
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
}

async function getOne(id) {
  const header = await authHeader();
  return axios
    .get(`${apiUrl}/event/${id}`, { headers: header })
    .then(handleResponse)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
}

const eventService = {
  create,
  getAll,
  getRoomEvents,
  getOne
};

export default eventService;
