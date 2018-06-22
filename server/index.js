const httpClient = require('request');
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const url = require('url');

const PORT = process.env.PORT || 5000;

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

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // Create a Trial.
  app.get('/newTrial', function(request, response) {
    if(!org.authenticated) { return; }


    console.log('q3= ',request);


    var myParams = " ";

    var myIndex = request.url.lastIndexOf("&");

    if (myIndex != -1) {
      myParams = request.url.substring(0,myIndex);
      myParams = url.parse(myParams).query;
    }

    console.log('myT= ',myParams);

    var trialData = url.parse(myParams,true);

    console.log('myParams= ',trialData)

    if (!myParams) {
      response.status(400).send('Missing query parameter.');
      console.log('error: missing param');
      return;
    }


    //let trial = force.createSObject('SignupRequest');
    //trial.set('firstName', tweet.text);
    //trial.set('username__c', tweet.user.screen_name);
    //trial.set('tweet_url__c', link);

    //org.insert({ sobject: trial }, (err) => {
    //    if(err) {
    //        console.error(err);
    //        process.exit(1);
    //    }
    //    else {
    //        console.log('Tweet published from', tweet.user.screen_name);
    //    }
    //})

    
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });


  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });
  

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
