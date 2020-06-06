const {ApolloServer} = require('apollo-server');
const typeDefs = require('./db/schema')
const resolvers = require ('./db/resolvers')
const conectarDB = require('./config/db')
const jwt = require('jsonwebtoken')

conectarDB()

// servidor

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    const token = req.headers['authorization'] || "";
    if (token){
      try {
        const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA );
        return {usuario}
      } catch (error) {
        console.log(error)
      }
    }
  }
});


server.listen({port: process.env.PORT} || 4000).then(({url})=> {
  console.log(`Servidor listo en la url ${url}`)
})