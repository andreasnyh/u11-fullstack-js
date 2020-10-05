const authJwt = require('./auth.jwt');
const authValidate = require('./auth.validate');
const validate = require('./validate');
const verify = require('./verify.email.role');

module.exports = {
  authJwt,
  authValidate,
  validate,
  verify,
};
