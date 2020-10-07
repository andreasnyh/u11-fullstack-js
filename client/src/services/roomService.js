/* eslint-disable import/no-cycle */
import axios from 'axios';

import config from '../config/config.json';
import { authHeader, handleResponse } from '../helpers';

async function create(room) {
  const header = await authHeader();
  console.log(header);
  axios
    .post(`${config.apiUrl}/admin/addroom`, room, { headers: header })
    .then(handleResponse)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      return res;
    })
    .catch((error) => {
      console.log(error);
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
            err.msg,
            '\nReason:',
            err.reason
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
            err.msg,
            '\nReason:',
            err.reason
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
  create,
  getAll,
  getOne
};

export default roomService;
