const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLID, GraphQLInputObjectType, GraphQLUnionType } = graphql;
const { PaginationInterface, PaginationType } = require('../type');

const PlantType = new GraphQLObjectType({
    name: 'Plant',
    fields: {
        id: { type: GraphQLID },
        commonName: { type: GraphQLString },
        binomialName: { type: GraphQLString },
        kingdom: { type: GraphQLString },
        family: { type: GraphQLString },
        genus: { type: GraphQLString },
        // total: { type: GraphQLInt }
    },
    // interfaces: () => {
    //     return [PaginationInterface];
    // }
});

const PlantInput = new GraphQLInputObjectType({
    name: 'PlantInput',
    fields: {
        commonName: { type: GraphQLString },
        binomialName: { type: GraphQLString },
        kingdom: { type: GraphQLString },
        family: { type: GraphQLString },
        genus: { type: GraphQLString }
    }
});

const PlantInputMutation = new GraphQLInputObjectType({
    name: 'PlantInputMutation',
    fields: {
        commonName: { type: GraphQLNonNull(GraphQLString) },
        binomialName: { type: GraphQLString, defaultValue: '' },
        kingdom: { type: GraphQLString, defaultValue: '' },
        family: { type: GraphQLString, defaultValue: '' },
        genus: { type: GraphQLString, defaultValue: '' }
    }
});

const PaginationUnion = new GraphQLUnionType({
    name: 'Pet',
    types: [ PlantType, PaginationType ],
    resolveType(value) {
        if (value.hasOwnProperty('total')) {
            return PaginationType;
        }
        
        return PlantType;
    }
});

module.exports = {
    PlantType,
    PlantInput,
    PlantInputMutation
}
