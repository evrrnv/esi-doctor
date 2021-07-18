import './App.css'
import { useKeycloak } from '@react-keycloak/web'

function App() {
  const { keycloak } = useKeycloak()

  return (
    <>
      <div className="App">Authenticated</div>
      <button onClick={() => keycloak.logout()}>logout</button>
    </>
  )
}

export default App
