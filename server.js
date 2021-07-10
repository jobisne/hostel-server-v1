const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB } = require('./config');
const PORT = process.env.port || 4000;

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');



mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Database connected ${MONGODB}`);
});





const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

server.applyMiddleware({ app })

app.use(express.static('public'));

app.use(cors());

app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:4000`);
})
