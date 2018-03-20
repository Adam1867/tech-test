const express = require('express');
const bodyParser = require('body-parser');
const peopleRoutes = require('./routes/people');

// create app
const app = express();

// add middleware to handle json data
app.use(bodyParser.json());

// add /api/people routes
app.use('/api/people', peopleRoutes);

// start listening for requests
app.listen(5000, () => {
  console.log(`Sky API listening on port ${5000}!`);
});

// export app (so we can test)
module.exports = app;
