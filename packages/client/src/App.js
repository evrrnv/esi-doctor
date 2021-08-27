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
import SpecifPatients from './views/SpecifPatients'
import studentOnly from './assets/images/studentOnly.svg'
import studentBag from './assets/images/studentBag.svg'
import teacherOnly from './assets/images/teacherOnly.svg'
import teacherEarth from './assets/images/teacherEarth.svg'
import atsOnly from './assets/images/atsOnly.svg'
import atsWesmo from './assets/images/atsWesmo.svg'
 
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

          

            

            <Route
              path='/patientsList/student'
              render={() => <SpecifPatients  type="Etudiants" nbr="900" data="Only students" complet="330" nonComplet="20" img1={studentOnly} img2={studentBag}/>}
            />
            <Route
              path='/patientsList/teacher'
              component={() => <SpecifPatients type="Enseignants" nbr="55" data="Only teachers" complet="30" nonComplet="15" img1={teacherOnly} img2={teacherEarth} />}
            />
            <Route
              path='/patientsList/ats'
              component={() => <SpecifPatients type="ATS" nbr="20" data="Only ATS" complet="15" nonComplet="3" img1={atsOnly} img2={atsWesmo}/>}
            />

            <Route path="/patientsList" component={Patients} />

            <Route path="/calendrier" component={Calend} />

            <Route path="/stat" component={Stat} />

            <Route path="/listes" component={Listes} />

            <Route path="/param" component={Param} />

            <Route path="/contact" component={Contact} />

         </Switch>
        </BrowserRouter>
      </div>
   
    </>
  )
}

export default App
