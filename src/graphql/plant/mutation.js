const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInputObjectType, GraphQLNullableType } = graphql;
const { PlantInput, PlantType, PlantInputMutation } = require('./type');

module.exports = {
    addPlant: {
        type: GraphQLString,
        args: {
            input: {
                type: PlantInputMutation
            }
        }
    }
}
