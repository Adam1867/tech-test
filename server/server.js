require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const peopleRoutes = require('./routes/people');

// set port from env
const port = process.env.PORT;

// create app
const app = express();

// add middleware to handle json data
app.use(bodyParser.json());

// add /api/people routes
app.use('/api/people', peopleRoutes);

// start listening for requests
app.listen(port, () => {
  console.log(`SkyBet API listening on port ${port}!`);
});

// export app (so we can test)
module.exports = app;
