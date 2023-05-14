const {
  Error: { ValidationError },
} = require('mongoose');

module.exports.handleError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.statusCode = 400;
  }
  const status = err.statusCode || 500;
  const message = err.message || 'server error';
  res.status(status).send(message);
};
