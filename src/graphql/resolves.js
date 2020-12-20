const db = require("../models");

// const resolvers = {
//     users: () => {
//         return ['Hello', 'world'];
//     },
//     user: (args) => {
//         return args.username;
//     },
// };
const resolvers = {
    users: () => {
        return db.user.findAll();
    },
    user: (args) => {
        return db.user.findOne({where: { username: args.username}});
    },
};

module.exports = resolvers;
