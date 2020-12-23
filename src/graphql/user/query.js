const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID, coerceInputValue } = graphql;
const { UserType, UserInput, PaginationUnion } = require('./type');
const { PaginationInput } = require('../type');

module.exports = {
    users: {
        args: {
            input: {
                type: UserInput
            },
            pagination: {
                type: PaginationInput,
                defaultValue: coerceInputValue({}, PaginationInput)
            }
        },
        // type: GraphQLNonNull(GraphQLList(GraphQLNonNull(UserType))),
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(PaginationUnion))),
    },
    user: {
        args: {
            username: {
                type: GraphQLNonNull(GraphQLString)
            }
        },
        type: UserType
    }
}
