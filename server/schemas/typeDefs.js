// Have to look at how the data is stored and or created
// Define the types User and Book
// we might neeeeed the ME stuff
const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]!
    bookCount: Int!
  }

  type Book {
    _id: ID!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(username: String!, book: BookInput!): User
    removeBook(username: String!, bookId: String!): User
  }
`;

// The input type in GraphQL used to define for creating a custom input for mutation in saveBook, not sure if it is currently needed

module.exports = typeDefs;