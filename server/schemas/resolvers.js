// have to look at how all of the data is called and utilised 
// Compared to the user-controller.js

const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // We do not need this
    /*
    users: async () => {
      return await User.find({});
    },
    */
    // get a single user by either their id or their username
    user: async (parent, { user = null, params }) => {
      return User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      });
    },
    // Also don't need this as the function is not in controller
    /*
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    */
  },

  Mutation: {
    addUser: async (parent, { body }) => {
      const user = await User.create({ body });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { body }) => {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { user, book }) => {
      return await User.findOneAndUpdate(
        { username },
        { $addToSet: { savedBooks: book } },
        // this will return the new object instead of the old in GraphQL
        { new: true, runValidators: true }
      );
    },
    removeBook: async (parent, { username, params }) => {
      return await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
