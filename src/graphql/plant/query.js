const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInputObjectType, coerceInputValue } = graphql;
const { PlantInput, PlantType } = require('./type');
const { PaginationInput, PaginationWrapper } = require('../type');

module.exports = {
    plants: {
        args: {
            input: {
                type: PlantInput
            },
            pagination: {
                type: PaginationInput,
                defaultValue: coerceInputValue({}, PaginationInput)
            }
        },
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(PlantType))),
        // type: GraphQLNonNull(PaginationWrapper),
    },
    plant: {
        args: {
            input: {
                type: PlantInput
            }
        },
        type: PlantType
    }
}
