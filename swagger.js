const swaggerAutogen = require('swagger-autogen')();

const os = require('os');
const host = os.hostname();
const port = process.env.PORT || 5000;
const baseUrl = `${host}:${port}`;

const doc = {
  info: {
    title: 'Teatro Apollo Nodejs + Mongodb',
    description: 'Description'
  },
  host: baseUrl,
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./app.js'); // Your project's root file
});