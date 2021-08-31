import React from 'react';
import SideBar from '../components/layout/sideBar';
import '../assets/css/patients.css'
import PatientCard from '../components/shared/patientCard';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import notif from '../assets/images/notif.png'
import student from '../assets/images/student.svg'
import teacher from '../assets/images/teacher.svg'
import ats from '../assets/images/ATS.svg'
import SearchIcon from '@material-ui/icons/Search';
import PatientType from '../components/shared/patientType';
import LastEdit from '../components/shared/lastEdit';
import HistoLastExam from '../components/shared/histoLastExam';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MenuIcon from '@material-ui/icons/Menu';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { showSidebarAction } from '../redux/actions';
import { useSelector,useDispatch } from 'react-redux'; 
import DoctorHeader from '../components/shared/doctorHeader';


const Patients = () => {

    

    return (
        <div className="main">
            <SideBar  />
            <div className="patients__content">
                <DoctorHeader />
                <div className="patients__body d-block d-sm-flex justify-content-between">
                    <div className="patients__types align-self-end">
                        <h1 className="patients__header mb-3 text-center">Surveiller la santé  de vos Patients </h1>
                        <div className="types__div d-block d-md-flex justify-content-between">
                            <PatientType path="/patientsList/student" img={student} type='Etudiant' nbr='900' />
                            <PatientType path="/patientsList/teacher" img={teacher} type='Enseignant' nbr='55' />
                            <PatientType path="/patientsList/ats" img={ats} type='ATS' nbr='20' />
                        </div>
                    </div>
                    <HistoLastExam type="all" />
                </div>
                <div className="modif__rec">
                    
                        <h3 className="modif__txt mb-3 ml-2">HISTORIQUE DE MODIFICATION DES DOSSIERS</h3>
                        <div className="modif__rec__content">
                            <div className="titles row ">
                                <h6 className="modif__titles col-1">№</h6>
                                <h6 className="modif__titles col-3">NOM</h6>
                                <h6 className="modif__titles col-2">MEDECIN</h6>
                                <h6 className="modif__titles col-3">DATE </h6>
                                <h6 className="modif__titles col-2">PARTIE </h6>
                                <h6 className="modif__titles col-1">№dm</h6>
                            </div>
                            <LastEdit NO="123" patient='Krebbaza Abdelbaki' doctor="Dr.Boussaid" date="25.juin.21"  part="BIOMERIQUE" dossierNbr="034"/>
                            <LastEdit NO="123" patient='Krebbaza Abdelbaki' doctor="Dr.Boussaid" date="25.juin.21"  part="BIOMERIQUE" dossierNbr="034"/>
                            <LastEdit NO="123" patient='Krebbaza Abdelbaki' doctor="Dr.Boussaid" date="25.juin.21"  part="BIOMERIQUE" dossierNbr="034"/>
                            <LastEdit NO="123" patient='Krebbaza Abdelbaki' doctor="Dr.Boussaid" date="25.juin.21"  part="BIOMERIQUE" dossierNbr="034"/>
                            <LastEdit NO="123" patient='Krebbaza Abdelbaki' doctor="Dr.Boussaid" date="25.juin.21"  part="BIOMERIQUE" dossierNbr="034"/>
                            <LastEdit NO="123" patient='Krebbaza Abdelbaki' doctor="Dr.Boussaid" date="25.juin.21"  part="BIOMERIQUE" dossierNbr="034"/>
                            <LastEdit NO="123" patient='Krebbaza Abdelbaki' doctor="Dr.Boussaid" date="25.juin.21"  part="BIOMERIQUE" dossierNbr="034"/>
                            <LastEdit NO="123" patient='Krebbaza Abdelbaki' doctor="Dr.Boussaid" date="25.juin.21"  part="BIOMERIQUE" dossierNbr="034"/>
                            <LastEdit NO="123" patient='Krebbaza Abdelbaki' doctor="Dr.Boussaid" date="25.juin.21"  part="BIOMERIQUE" dossierNbr="034"/>
                            <LastEdit NO="123" patient='Krebbaza Abdelbaki' doctor="Dr.Boussaid" date="25.juin.21"  part="BIOMERIQUE" dossierNbr="034"/>
                            <LastEdit NO="123" patient='Krebbaza Abdelbaki' doctor="Dr.Boussaid" date="25.juin.21"  part="BIOMERIQUE" dossierNbr="034"/>
                            <LastEdit NO="123" patient='Krebbaza Abdelbaki' doctor="Dr.Boussaid" date="25.juin.21"  part="BIOMERIQUE" dossierNbr="034"/>
                        </div>
                </div>
            </div>
        
        </div>
    );
};

export default Patients;