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

const Patients = () => {
    return (
        <div className="main">
            <SideBar className="sideBar" />
            <div className="patients__content">
                <div className="patients__head d-flex justify-content-between align-items-center">
                    <h2 className="head__txt">Bonjour, Dr.Mesmoudi </h2>
                    <div className="d-flex align-items-center">
                         <img className="dash__avatar" src={avatar} alt="" />
                         <span className="avatar__infos">
                           <span className="avatar__name">M.Amin Mesmoudi</span><br></br>
                           <span className="avatar__title"><ArrowForwardIosIcon className="arrow__title"/>Médecin</span>
                         </span>
                         <span><img id="notif__icon" src={notif} alt="" /></span>
                    </div>
                </div>
                <div className="patients__body row d-flex justify-content-between">
                    <div className="patients__types">
                        <h1 className="patients__header mb-3 text-center">Surveiller la santé  de vos Patients </h1>
                        <div className="types__div d-flex justify-content-between">
                            <div className="types d-flex flex-column justify-content-between">
                                <img className="types__imgs"  src={student} alt="" />
                                <div className="types__txt">
                                   <h3>Etudiant</h3>
                                   <p className="nbr__tot">Nombre total : 900</p>
                                </div>
                            </div>
                            <div className="types d-flex flex-column justify-content-between">
                                <img className="types__imgs" src={teacher} alt="" />
                                <div className="types__txt">
                                   <h3>Enseignant</h3>
                                   <p className="nbr__tot">Nombre total : 55</p>
                                </div>
                            </div>
                            <div className="types d-flex flex-column justify-content-between">
                                <img className="types__imgs" src={ats} alt="" />
                                <div className="types__txt">
                                   <h3>ATS</h3>
                                   <p className="nbr__tot">Nombre total : 20</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="patients__examen">
                        <h6 className="text-center">Les derniers examen médicaux</h6>
                        <div className="d-flex justify-content-between align-items-center m-1">
                           <input className="pers__recherche" type="text" placeholder="Rechercher" />
                           <span id="search__icon"><SearchIcon/></span>
                        </div>
                        <div className="pers__examen">
                            <div className="pers d-flex align-items-center">
                             <img className="dash__avatar__ex" src={avatar} alt="" />
                             <span className="avatar__infos__ex">
                               <span className="avatar__name__ex">Krebbaza abdelbaki</span><br></br>
                               <span className="avatar__title__ex">Etudiant</span>
                             </span>
                            </div>
                            <div className="pers d-flex align-items-center">
                             <img className="dash__avatar__ex" src={avatar} alt="" />
                             <span className="avatar__infos__ex">
                               <span className="avatar__name__ex">Boussaid Aek</span><br></br>
                               <span className="avatar__title__ex">Enseignant</span>
                             </span>
                            </div>
                            <div className="pers d-flex align-items-center">
                             <img className="dash__avatar__ex" src={avatar} alt="" />
                             <span className="avatar__infos__ex">
                               <span className="avatar__name__ex">Moncif Bendada</span><br></br>
                               <span className="avatar__title__ex">ATS</span>
                             </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modif__rec">
                    <h3 className="modif__txt mb-3 ml-1">DERNIERES MODIFICATION</h3>
                    <div className="titles row">
                        <h6 className="modif__titles col-1">NO</h6>
                        <h6 className="modif__titles col-3">NOM</h6>
                        <h6 className="modif__titles col-2">MEDECIN</h6>
                        <h6 className="modif__titles col-3">DATE DE MODIFICATION</h6>
                        <h6 className="modif__titles col-2">PARTIE MODIFIE</h6>
                        <h6 className="modif__titles col-1 text-nowrap">NO DOSSIER</h6>
                    </div>
                    <div className="modif__list row">
                        <h6 className="modif__elem col-1">001</h6>
                        <h6 className="modif__elem col-3">Krebbaza Abdelbaki</h6>
                        <h6 className="modif__elem col-2 medecin__elem">Dr.Boussaid</h6>
                        <h6 className="modif__elem col-3">25.juin.21</h6>
                        <h6 className="modif__elem col-2">BIOMERIQUE</h6>
                        <h6 className="modif__elem col-1 text-nowrap">123</h6>
                    </div>
                    <div className="modif__list row">
                        <h6 className="modif__elem col-1">001</h6>
                        <h6 className="modif__elem col-3">Krebbaza Abdelbaki</h6>
                        <h6 className="modif__elem col-2 medecin__elem">Dr.Boussaid</h6>
                        <h6 className="modif__elem col-3">25.juin.21</h6>
                        <h6 className="modif__elem col-2">BIOMERIQUE</h6>
                        <h6 className="modif__elem col-1 text-nowrap">123</h6>
                    </div>
                    <div className="modif__list row">
                        <h6 className="modif__elem col-1">001</h6>
                        <h6 className="modif__elem col-3">Krebbaza Abdelbaki</h6>
                        <h6 className="modif__elem col-2 medecin__elem">Dr.Boussaid</h6>
                        <h6 className="modif__elem col-3">25.juin.21</h6>
                        <h6 className="modif__elem col-2">BIOMERIQUE</h6>
                        <h6 className="modif__elem col-1 text-nowrap">123</h6>
                    </div>
                    <div className="modif__list row">
                        <h6 className="modif__elem col-1">001</h6>
                        <h6 className="modif__elem col-3">Krebbaza Abdelbaki</h6>
                        <h6 className="modif__elem col-2 medecin__elem">Dr.Boussaid</h6>
                        <h6 className="modif__elem col-3">25.juin.21</h6>
                        <h6 className="modif__elem col-2">BIOMERIQUE</h6>
                        <h6 className="modif__elem col-1 text-nowrap">123</h6>
                    </div>
                    <div className="modif__list row">
                        <h6 className="modif__elem col-1">001</h6>
                        <h6 className="modif__elem col-3">Krebbaza Abdelbaki</h6>
                        <h6 className="modif__elem col-2 medecin__elem">Dr.Boussaid</h6>
                        <h6 className="modif__elem col-3">25.juin.21</h6>
                        <h6 className="modif__elem col-2">BIOMERIQUE</h6>
                        <h6 className="modif__elem col-1 text-nowrap">123</h6>
                    </div>
                    <div className="modif__list row">
                        <h6 className="modif__elem col-1">001</h6>
                        <h6 className="modif__elem col-3">Krebbaza Abdelbaki</h6>
                        <h6 className="modif__elem col-2 medecin__elem">Dr.Boussaid</h6>
                        <h6 className="modif__elem col-3">25.juin.21</h6>
                        <h6 className="modif__elem col-2">BIOMERIQUE</h6>
                        <h6 className="modif__elem col-1 text-nowrap">123</h6>
                    </div>
                    <div className="modif__list row">
                        <h6 className="modif__elem col-1">001</h6>
                        <h6 className="modif__elem col-3">Krebbaza Abdelbaki</h6>
                        <h6 className="modif__elem col-2 medecin__elem">Dr.Boussaid</h6>
                        <h6 className="modif__elem col-3">25.juin.21</h6>
                        <h6 className="modif__elem col-2">BIOMERIQUE</h6>
                        <h6 className="modif__elem col-1 text-nowrap">123</h6>
                    </div>
                </div>
            </div>
        
        </div>
    );
};

export default Patients;