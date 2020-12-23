const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInputObjectType, GraphQLUnionType } = graphql;
const { PaginationType } = require('../type');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString }
    }
});

const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString }
    }
});


const PaginationUnion = new GraphQLUnionType({
    name: 'UserPaginationUnion',
    types: [ UserType, PaginationType ],
    resolveType(value) {
        if (value.hasOwnProperty('total')) {
            return PaginationType;
        } else if (Object.getOwnPropertyNames(value).length > 0) {
            return UserType;
        }
    }
});

module.exports = {
    UserType,
    UserInput,
    PaginationUnion
}
