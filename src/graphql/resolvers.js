const db = require("../models");

// const resolvers = {
//     users: () => {
//         return ['Hello', 'world'];
//     },
//     user: (args) => {
//         return args.username;
//     },
// };

//errors.js
// export class UnauthorizedError extends Error { … }
// export class ForbiddenError extends Error { … }
// export class LegallyUnavailableError extends Error { … }

// function(user) {
//     return (user && user.roles.includes('USER_ROLE'));
//     "user", "admin", "moderator"
// }

// {
//     content: [], // all the response items will go in this array
//         page: 1, // current page
//     results_per_page: 5, // how many items available in "content"
//     total_results: 100 // total number of items
// }

const resolvers = {
    users: (args, request) => {
        console.log(request.user);

        // throw new Error('Blablah');

        // return new Promise((resolve, reject) => {
        //     if (request.user.roles.includes('USER_ROLE')) {
        //         resolve([{username: 'agatka'}]);
        //     } else {
        //         reject("Blabla");
        //     }
        // });

        return db.user.findAll();
    },
    user: (args) => {
        return db.user.findOne({where: { username: args.username}});
    },
};

module.exports = resolvers;
