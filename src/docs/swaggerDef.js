const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Example Express Server',
    version,
    license: {
      name: 'MIT',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}`,
    },
  ],
};

module.exports = swaggerDef;
