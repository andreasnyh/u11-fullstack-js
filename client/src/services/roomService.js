/* eslint-disable import/no-cycle */
import axios from 'axios';

import config from '../config/config.json';
import { authHeader, handleResponse } from '../helpers';

async function createRoom(room) {
  axios
    .post('http://localhost:5000/api/auth/AddRoom', room)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      // window.location = `${window.location.origin}/home`;
    })
    .catch((error) => {
      if (error.response) {
        const errorArray = [];
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        error.response.data.errors.forEach((err) => {
          console.log(
            'status:',
            error.response.status,
            '\nparam:',
            err.param,
            '\nError:',
            err.msg
          );
          errorArray.push({ param: err.param, mgs: err.msg });
        });

        console.log(errorArray);
        this.setState({
          errors: errorArray
        });

        // console.log(error.response.status);
        // console.log(error.response.data);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
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
  createRoom,
  getAll,
  getOne
};

export default roomService;
