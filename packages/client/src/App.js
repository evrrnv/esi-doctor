import './App.css'
import { BrowserRouter,Switch, Route,Redirect } from 'react-router-dom'
import Dashboard from './views/DashBoard'
import RdvList from './views/RdvList'
import Patients from './views/Patients'
import Calend from './views/Calend'
import Stat from "./views/Stat"
import Listes from './views/Listes'
import Param from './views/Param'
import Contact from './views/Contact'
import PatientInfos from './components/shared/patientInfos'
function App() {
 

  return (
    <>
      <div className="App">
        <BrowserRouter>
         <Switch>

            <Route exact  path="/">
             <Redirect to="/dashboard" />
            </Route>

            <Route path="/dashboard" component={Dashboard} />

            <Route path="/rdvList" component={RdvList} />

            <Route path="/patientsList" component={Patients} />

            <Route path="/calendrier" component={Calend} />

            <Route path="/stat" component={Stat} />

            <Route path="/listes" component={Listes} />

            <Route path="/param" component={Param} />

            <Route path="/contact" component={Contact} />
            <Route path="/patientsListInfos" component={PatientInfos}/>

         </Switch>
        </BrowserRouter>
      </div>
   
    </>
  )
}

export default App
