const Keycloak = require('keycloak-connect')

const configureKeycloak = (app, graphqlPath) => {

  const keycloak = new Keycloak({})

  app.use(
    keycloak.middleware({
      admin: graphqlPath
    })
  )

  return { keycloak }
}

module.exports = { configureKeycloak }
