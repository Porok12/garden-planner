const graphql = require('graphql')
const { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } = graphql

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString }
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: () => ({
            users: {
                type: GraphQLNonNull(GraphQLList(GraphQLNonNull(UserType))),
            },
            user: {
                args: {
                    username: {
                        type: GraphQLNonNull(GraphQLString)
                    }
                },
                type: UserType
            },
        })
    })
});

// const schema = buildSchema(`
//         type User {
//             id: ID!
//             username: String!
//             email: String!
//         }
//
//         input UserInput {
//             id: ID!
//         }
//
//         type RootQuery {
//             users: [String]
//             user(username: String): String
//         }
//
//         schema {
//             query: RootQuery
//         }
//     `);

module.exports = schema
