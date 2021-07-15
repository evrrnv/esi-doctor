require('dotenv').config()
const path = require('path')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./graphql')

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
  })
  await server.start()

  const app = express()

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../web')))
  }

  server.applyMiddleware({ app, path: '/api' })

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()
