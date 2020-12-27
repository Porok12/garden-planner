const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType } = graphql;
const userQuery = require('./user/query');
const plantQuery = require('./plant/query');
const plantMutation = require('./plant/mutation');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: () => ({
            ...userQuery,
            ...plantQuery
        })
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: () => ({
            ...plantMutation
        })
    })
});

module.exports = schema
