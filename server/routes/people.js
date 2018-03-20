const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// GET / - Return all people
router.get('/', (req, res) => {
  const people = JSON.parse(fs.readFileSync(path.join(__dirname, './../../', 'db/people.json')));
  res.send({ people });
});

// GET /:id - Return single person (unused)
router.get('/:id', (req, res) => {
  const people = JSON.parse(fs.readFileSync(path.join(__dirname, './../../', 'db/people.json')));
  const person = people.find(p => p.id === parseInt(req.params.id, 10));
  if (person) {
    res.send({ person });
  } else {
    res.status(404).send();
  }
});

module.exports = router;
