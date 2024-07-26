// retrieve the typeDefs and resolvers and export them to be used in other files
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };
