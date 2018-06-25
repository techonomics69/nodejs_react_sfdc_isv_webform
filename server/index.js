const httpClient = require('request');
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const url = require('url');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const templateId = process.env.TRIALFORCE_TEMPLATE_ID;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  global.exit = function exit(code, msg) { console.log(`ERROR: ${msg}`); process.exit(code || 1); }
  global.missing = function missing(variable) { exit(1, `${variable} environment variable required.`); }

  let { org, force } = require('./salesforce');


  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  //Parse the text as URL encoded data and expose the resulting object on request.body
  //app.use(bodyParser.urlencoded({
    //extended: true
  //}));

  //Parses the text as JSON and exposes the resulting object on request.body
  app.use(bodyParser.json());

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // Create a Trial.
  app.post('/newtrial', function(req, res) {
    if(!org.authenticated) { return; }

    console.log('body= ',req.body);


    if (!req.body) {
      res.status(400).send('Missing query parameter.');
      console.log('error: missing param');
      return;
    }


    let trial = force.createSObject('SignupRequest');


    
    res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    req.destroy();
  });


  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });
  

}
