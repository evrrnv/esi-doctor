import React from 'react';
import SideBar from '../components/layout/sideBar';
import '../assets/css/patients.css'
import PatientCard from '../components/shared/patientCard';
import avatar  from '../assets/images/avatar.jpg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import notif from '../assets/images/notif.png'
import student from '../assets/images/student.png'
import teacher from '../assets/images/Professor.png'
import ats from '../assets/images/ATS.png'
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


const Patients = () => {

    const dispatch = useDispatch(); 
    const showSidebar = useSelector(showSide => showSide.showSidebar)

    return (
        <div className="main">
            <SideBar  />
            <div className="patients__content">
                <div className="patients__head d-flex justify-content-between align-items-center">
                    <button onClick={()=> dispatch(showSidebarAction())} className="d-block d-sm-none burger"><FontAwesomeIcon icon={faBars}/></button>
                    <h2 className="head__txt d-none d-sm-block">Bonjour,<br></br> Dr.Mesmoudi </h2>
                    <div className="d-flex align-items-center">
                         <img className="dash__avatar" src={avatar} alt="" />
                         <span className="avatar__infos">
                           <span className="avatar__name">M.Amin Mesmoudi</span><br></br>
                           <span className="avatar__title"><ArrowForwardIosIcon className="arrow__title"/>Médecin</span>
                         </span>
                         <span><NotificationsNoneIcon id="notif__icon" /></span>
                    </div>
                </div>
                <div className="patients__body row d-block d-sm-flex justify-content-between">
                    <div className="patients__types align-self-end">
                        <h1 className="patients__header mb-3 text-center">Surveiller la santé  de vos Patients </h1>
                        <div className="types__div d-block d-md-flex justify-content-between">
                            <PatientType img={student} type='Etudiant' nbr='900' />
                            <PatientType img={teacher} type='Enseignant' nbr='55' />
                            <PatientType img={ats} type='ATS' nbr='20' />
                        </div>
                    </div>
                    <HistoLastExam type="all" />
                </div>
                <div className="modif__rec row d-block">
                    
                        <h3 className="modif__txt mb-3 ml-1">HISTORIQUE DE MODIFICATION</h3>
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