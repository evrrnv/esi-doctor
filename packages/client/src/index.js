import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web'
import keycloak from './keycloak'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'


const Apollo = ({ children }) => {
  const { keycloak } = useKeycloak()

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/api',
  })
  const authLink = setContext((_, { headers }) => {
    const token = keycloak.token
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: 'login-required' }}
      LoadingComponent={<span>Loading...</span>}
    >
      <Apollo>
        <App />
      </Apollo>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
