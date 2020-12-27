const user = require('./user/resolvers');
const plant = require('./plant/resolvers');

const resolvers = {
    ...user,
    ...plant
};

module.exports = resolvers;
