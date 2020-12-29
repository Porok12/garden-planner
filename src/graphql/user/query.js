const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID, coerceInputValue } = graphql;
const { UserType, UserInput, PaginationUnion } = require('./type');
const { PaginationInput, PaginationType } = require('../type');

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
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(UserType)))
    },
    user: {
        args: {
            username: {
                type: GraphQLNonNull(GraphQLString)
            }
        },
        type: UserType
    },
    countUsers: {
        args: {
            input: {
                type: UserInput
            }
        },
        type: GraphQLNonNull(PaginationType)
    },
}
