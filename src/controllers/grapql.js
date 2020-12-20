const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('../graphql/schema');
const graphqlResolver = require('../graphql/resolves');

module.exports.controller = graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true, //process.env.NODE_ENV === 'development'
    customFormatErrorFn: (error) => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
    })
});
