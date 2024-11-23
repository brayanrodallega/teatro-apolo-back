const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Teatro Apollo Nodejs + Mongodb',
    description: 'Description'
  },
  host: 'https://refactored-happiness-44vxj695vpfjw7q.github.dev/:5000'
};

const outputFile = './swagger-output.json';
const routes = ['./app.js']

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./app.js'); // Your project's root file
});