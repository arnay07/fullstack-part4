const { _info, _error } = require('./logger');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const expressWinston = require('express-winston');
const responseTime = require('response-time');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = (req, res, next) => {
  const token = req.token;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (decodedToken.id) {
      req.userId = decodedToken.id;
    }
  }
  next();
};

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.json(),
  statusLevels: true,
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  expressFormat: true,
  ignoredRoute() {
    return false;
  },
});

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: 'unknown endpoint' });
  next();
};

const errorHandler = (error, req, res, next) => {
  _error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired',
    });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  responseTime,
};
