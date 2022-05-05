const {ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const typeDefs = require('./typeDef/type');
const resolvers = require('./typeDef/index');
mongoose.connect('mongodb://localhost:27017/gql-Tutorial');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req})
})
 server.listen({port:5000}).then(res=>console.log(`server is running on ${res.url}`))
