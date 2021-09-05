import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App'
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web'
import keycloak from './keycloak'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {createStore} from 'redux'
import allReducers from './redux/reducers'
import {Provider} from 'react-redux'
import { CircularProgress } from '@material-ui/core';
import Loading from './components/shared/loading';

const cache = new InMemoryCache({ dataIdFromObject: object => object.nodeId || null })

const Apollo = ({ children }) => {
  const { keycloak } = useKeycloak()
  console.log(keycloak.token)
  const httpLink = createHttpLink({
    uri: process.env.NODE_ENV === 'production' ? 'http://1sc-project.moun3im.com/graphql' : 'http://localhost:4000/graphql',
    credentials: 'same-origin'
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
    cache
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: 'login-required' }}
      LoadingComponent={<Loading />}
    >
      <Apollo>
      <Provider store ={store}>
        <App />
      </Provider>
      </Apollo>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
