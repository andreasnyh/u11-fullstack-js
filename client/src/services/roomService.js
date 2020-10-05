/* eslint-disable import/no-cycle */
import axios from 'axios';

import config from '../config/config.json';
import { authHeader, handleResponse } from '../helpers';

async function getAll() {
  const header = await authHeader();
  return axios
    .get(`${config.apiUrl}/rooms/allrooms`, { headers: header })
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
            err.msg
          );
          errorArray.push({
            status: error.response.status,
            param: err.param,
            msg: err.msg
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

async function getOne(id) {
  const header = await authHeader();
  return axios
    .get(`${config.apiUrl}/rooms/room/${id}`, { headers: header })
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
            err.msg
          );
          errorArray.push({
            status: error.response.status,
            param: err.param,
            msg: err.msg
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

const roomService = {
  getAll,
  getOne
};

export default roomService;
