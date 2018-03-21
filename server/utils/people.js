const _ = require('lodash');

const getNextId = (people) => {
  const ids = _.map(people, 'id');
  const highestId = _.max(ids) || 0;
  return highestId + 1;
};

module.exports = {
  getNextId,
};
