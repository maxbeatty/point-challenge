const {
  ApolloServer,
  gql,
  AuthenticationError
} = require("apollo-server-micro");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const { admin } = require("../src/firebase");
const store = require("../src/store");

const auth = admin.auth();

const typeDefs = gql`
  scalar Date

  type Query {
    serverTime: Date!
    viewer: User!
  }

  type Mutation {
    messageCreate(status: String!): Message
    messageEdit(messageUID: ID!, status: String!): Message
    messageDelete(messageUID: ID): Boolean
  }

  type User {
    uid: ID!
    email: String!
    messages: [Message!]
  }

  type Message {
    uid: ID!
    status: String!
    createdAt: Date!
    updatedAt: Date!
  }
`;

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  }),
  Query: {
    serverTime() {
      return new Date();
    },
    viewer(parent, args, context) {
      return auth.getUser(context.user.uid);
    }
  },
  Mutation: {
    messageCreate(parent, args, context) {
      return store.createMessage(context.user.uid, args.status);
    },
    messageEdit(parent, args, context) {
      return store.editMessage(context.user.uid, args.messageUID, args.status);
    },
    messageDelete(parent, args, context) {
      store.deleteMessage(context.user.uid, args.messageUID);
      return true;
    }
  },
  User: {
    messages({ uid }) {
      return store.getMessagesForUser(uid);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: process.env.DEBUG || process.env.NODE_ENV === "development",
  context: async ({ req }) => {
    try {
      const bearerToken = req.headers.authorization || "";
      const m = bearerToken.match(/^[Bb]earer (.+)$/);
      if (m == null) {
        throw new Error("Malformed authorization header");
      }

      const { uid } = await auth.verifyIdToken(m[1]);

      return {
        user: { uid }
      };
    } catch (ex) {
      console.error(ex);
      throw new AuthenticationError(ex.message);
    }
  }
});

module.exports = server.createHandler({ path: "/api/graphql" });
