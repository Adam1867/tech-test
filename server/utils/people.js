const _ = require('lodash');

const getNextId = (people) => {
  const ids = _.map(people, 'id');
  const highestId = _.max(ids);
  return highestId + 1;
};

module.exports = {
  getNextId,
};
