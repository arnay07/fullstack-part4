const express = require('express');
const { MONGODB_URI } = require('./utils/config');
const mongoose = require('mongoose');
const cors = require('cors');
require('express-async-errors'); // Must be put before routes otherwise it won't work
const blogRouter = require('./routes/BlogRoutes');
const {
  errorHandler,
  unknownEndpoint,
  requestLogger,
} = require('./utils/middleware');

const app = express();

console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.use('/api/blogs', blogRouter);

app.use(unknownEndpoint);

app.use(errorHandler);

module.exports = app;