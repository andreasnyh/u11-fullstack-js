/* eslint-disable import/no-cycle */
import axios from 'axios';

import config from '../config/config.json';
import { authHeader, handleResponse } from '../helpers';

async function create(event) {
  const header = await authHeader();
  console.log(header);
  axios
    .post(`${config.apiUrl}/event/`, event, { headers: header })
    .then(handleResponse)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      return res;
    })
    .catch((error) => {
      handleResponse(error);
    });
}

async function getAll() {
  const header = await authHeader();
  return axios
    .get(`${config.apiUrl}/event`, { headers: header })
    .then((res) => handleResponse(res))
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleResponse(error);
    });
}

async function getOne(id) {
  const header = await authHeader();
  return axios
    .get(`${config.apiUrl}/events/event/${id}`, { headers: header })
    .then(handleResponse)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error.response) {
        const errorArray = [];
        error.response.data.errors.forEach((err) => {
          console.log(
            'status:',
            error.response.status,
            '\nparam:',
            err.param,
            '\nError:',
            err.msg,
            '\nReason:',
            err.reason
          );
          errorArray.push({
            status: error.response.status,
            param: err.param,
            msg: err.msg,
            reason: err.reason
          });
        });
        return errorArray;
      }
      if (error.request) {
        return error.request;
      }
      return error.message;

      // console.log(error.config);
    });
}

const eventService = {
  create,
  getAll,
  getOne
};

export default eventService;