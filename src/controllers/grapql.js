const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('../graphql/schema');
const graphqlResolver = require('../graphql/resolves');

function ShowContext(context) {
    return {
        Field(node) {
            console.log(node);
            console.log(context);
        },
    };
}

const checkPermissions = (context) => {
    console.log(context);
    return {

    }
}

function checkPermission(user, permission) {
    if (user && user["https://spaceapi.com/graphql"]) {
        return user["https://spaceapi.com/graphql"].permissions.includes(
            permission
        );
    }
    return false;
}


const extensions = ({
                        document,
                        variables,
                        operationName,
                        result,
                        context,
                    }) => {
    return {
        headers: context.headers,
    };
};



// module.exports.controller = graphqlHTTP(async (request, response, graphQLParams) => ({
//     schema: graphqlSchema,
//     rootValue: graphqlResolver,
//     graphiql: true, //process.env.NODE_ENV === 'development'
//     validationRules: [checkPermissions],
//     // extensions,
//     context: request,
//     customFormatErrorFn: (error) => ({
//         message: error.message,
//         locations: error.locations,
//         stack: error.stack ? error.stack.split('\n') : [],
//         path: error.path,
//     })
// }));

module.exports.controller = graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true, //process.env.NODE_ENV === 'development'
    // validationRules: [checkPermissions],
    // extensions,
    // context: ({req}) => {
    //     const user = req.user || null;
    //     console.log(user);
    //     return { user };
    // },
    customFormatErrorFn: (error) => ({
        message: error.message,
        // locations: error.locations,
        // stack: error.stack ? error.stack.split('\n') : [],
        // path: error.path,
    })
});
