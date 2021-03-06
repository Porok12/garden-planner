const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInputObjectType, coerceInputValue } = graphql;
const { PlantInput, PlantType, PaginationUnion } = require('./type');
const { PaginationInput, PaginationWrapper, PaginationType } = require('../type');

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
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(PlantType)))
    },
    plant: {
        args: {
            input: {
                type: PlantInput
            }
        },
        type: PlantType
    },
    countPlants: {
        args: {
            input: {
                type: PlantInput
            }
        },
        type: GraphQLNonNull(PaginationType)
    },
    trefle: {
        args: {
            input: {
                type: PlantInput
            }
        },
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(PlantType)))
    },
}
