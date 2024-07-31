const express = require("express");
// Need to import Apollo server
const { ApolloServer } = require("@apollo/server");
// as well as the express middleware
const { expressMiddleware } = require("@apollo/server/express4");
// need to connect and define the schemas and resolvers
const { typeDefs, resolvers } = require("./schemas");

// Importing JW tokens for Middleware authentication
const { authMiddleware } = require("./utils/auth");

const path = require("path");
const db = require("./config/connection");

// We probably do not need this anymore because it will be combined with the resolvers
// leave directory in for now, but might delete directory later
// directories to delete are the routes and controllers
// const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Need to define the Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// create a function to connect apollo server
const startApolloServer = async () => {
  // Start the Apollo server
  await server.start();

  // Change to false
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Apply authentication middleware and remove the use of routes in preference for GraphQL
  // app.use(routes);
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );
  

  // if we're in production, serve client/build as static assets
  // NOTES FROM 21 MERN: 11 MERN SETUP
  // Important for MERN Setup: When our application runs from production, it functions slightly differently than in development
  // In development, we run two servers concurrently that work together
  // In production, our Node server runs and delivers our client-side bundle from the dist/ folder - change from build to dist
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      // log link to graphql
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Need to start the apolloServer by calling the function
startApolloServer();
