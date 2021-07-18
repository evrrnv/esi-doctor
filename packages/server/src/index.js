require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const {
  KeycloakContext,
  KeycloakTypeDefs,
  KeycloakSchemaDirectives
} = require('keycloak-connect-graphql')
const { configureKeycloak } = require('./lib/configKeycloak')
const { typeDefs, resolvers } = require('./graphql')

;(async () => {
  const graphqlPath = '/api'

  const app = express()

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('web'))
  }

  const { keycloak } = configureKeycloak(app, graphqlPath)

  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs: [KeycloakTypeDefs, typeDefs],
      resolvers,
      schemaDirectives: KeycloakSchemaDirectives
    }),
    context: ({ req }) => {
      return {
        kauth: new KeycloakContext({ req }, keycloak)
      }
    }
  })
  await server.start()

  server.applyMiddleware({ app, path: graphqlPath })

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})()
