import './App.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './views/DashBoard'
import RdvList from './views/RdvList'
import Patients from './views/Patients'
import Calend from './views/Calend'
import Stat from './views/Stat'
import Listes from './views/Listes'
import Param from './views/Param'
import Contact from './views/Contact'
import PatientInfos from './components/shared/patientInfos'
import Examen from './views/Examen'
import SpecifPatients from './views/SpecifPatients'
import studentOnly from './assets/images/studentOnly.svg'
import studentBag from './assets/images/studentBag.svg'
import teacherOnly from './assets/images/teacherOnly.svg'
import teacherEarth from './assets/images/teacherEarth.svg'
import atsOnly from './assets/images/atsOnly.svg'
import atsWesmo from './assets/images/atsWesmo.svg'
import DashBoard from './views/DashBoard'
import AprouvRdvModal from './components/shared/aprouvRdvModal'
import ArchiveModal from './components/shared/archiveModal'

function App() {
  return (
    <>
      <div className="App">
        <AprouvRdvModal />
        <ArchiveModal />
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>

            <Route path="/dashboard" component={DashBoard} />

            <Route path="/rdvList" component={RdvList} />

            <Route
              path="/patientsList/student"
              render={() => (
                <SpecifPatients
                  type="Etudiants"
                  data="Only students"
                  img1={studentOnly}
                  img2={studentBag}
                />
              )}
            />
            <Route
              path="/patientsList/teacher"
              component={() => (
                <SpecifPatients
                  type="Enseignants"
                  data="Only teachers"
                  img1={teacherOnly}
                  img2={teacherEarth}
                />
              )}
            />
            <Route
              path="/patientsList/ats"
              component={() => (
                <SpecifPatients
                  type="ATS"
                  data="Only ATS"
                  img1={atsOnly}
                  img2={atsWesmo}
                />
              )}
            />

            <Route path="/patientsList" component={Patients} />

            <Route path="/calendrier" component={Calend} />

            <Route path="/stat" component={Stat} />

            <Route path="/listes" component={Listes} />

            <Route path="/param" component={Param} />

            <Route path="/contact" component={Contact} />

            <Route path="/patientsListInfos" component={PatientInfos} />

            <Route path="/examiner" component={Examen} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
