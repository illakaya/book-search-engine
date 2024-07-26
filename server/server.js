const express = require("express");
// Need to import Apollo server
// const { ApolloServer } = require('@apollo/server');
// as well as the express middleware
// const { expressMiddleware } = require('@apollo/server/express4');
const path = require("path");

// need to define the schemas as well
// const { typeDefs, resolvers } = require('./schemas');
const db = require("./config/connection");

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Need to define the server
/*
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
*/

// const startApolloServer = async () => {
  // Start the Apollo server
  // await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
    
    // do we need to add something here????
    /*
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
    */
  }

  // might need to change from routes to graphql??
  // app.use('/graphql', expressMiddleware(server));
  app.use(routes);

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      // log link to graphql
      // console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
// }

// Need to start the apolloServer
// startAPolloServer();
