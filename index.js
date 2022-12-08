const http = require('http');
const { _info } = require('./utils/logger');

const app = require('./app');
const { PORT } = require('./utils/config');

const server = http.createServer(app);

server.listen(PORT, () => {
  _info(`Server running on port ${PORT}`);
});
