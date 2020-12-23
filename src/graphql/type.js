const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLInputObjectType, GraphQLUnionType, GraphQLInterfaceType } = graphql;

const PaginationInput = new GraphQLInputObjectType({
    name: 'PaginationInput',
    fields: {
        page: { type: GraphQLInt, defaultValue: 1 },
        slice: { type: GraphQLInt, defaultValue: 20 }
    }
});

const PaginationInterface = new GraphQLInterfaceType({
    name: 'PaginationInterface',
    fields: {
        total: { type: GraphQLInt }
    }
});

const PaginationWrapper = new GraphQLInputObjectType({
    name: 'PaginationInterface',
    fields: {
        content: { type: GraphQLList },
        total: { type: GraphQLInt }
    }
});

const PaginationType = new GraphQLObjectType({
    name: 'PaginationType',
    fields: {
        total: { type: GraphQLInt }
    }
});

module.exports = {
    PaginationInput,
    PaginationInterface,
    PaginationWrapper,
    PaginationType
}
