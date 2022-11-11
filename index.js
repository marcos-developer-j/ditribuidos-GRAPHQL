const { getUserId } = require('./src/utils');
const Query = require('./src/resolvers/Query')
const Mutation = require('./src/resolvers/Mutation')
const user_ = require('./src/resolvers/User')
const link = require('./src/resolvers/Link')
const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const path = require('path');
const resolvers = {
    Query,
    Mutation,
    user_,
    link
  }
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, '/src/schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
});

server
  .listen(4000)
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );