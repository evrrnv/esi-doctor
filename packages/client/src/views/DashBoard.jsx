import React from 'react';
import SideBar from '../components/layout/sideBar';
import avatar  from '../assets/images/avatar.jpg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Avatar } from '@material-ui/core';
import '../assets/css/dashboard.css'
import Notification from '../assets/images/notif.png'
import search from '../assets/images/search.png'
import DoctorHeader from '../components/shared/doctorHeader';
import SearchIcon from '@material-ui/icons/Search';
import LastExam from '../components/shared/lastExam';
import { useQuery } from '@apollo/client';
import { GET_PATIENTS_LIST } from '../graphql/queries/GET_PATIENTS_LIST';
import Loading from '../components/shared/loading';

const ProchainRdv = (props) => {
    return(
        <div className="pers d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center"> 
            <img className="dash__avatar__ex" src={props.avatar} alt={props.name} />
            <span className="avatar__infos__ex">
              <span className="avatar__name__ex">{props.name}</span><br />
              <span className="avatar__title__ex">{props.title}</span>
            </span>
        </div>
        <span id="lastExam__time">{props.time}</span>
    </div>
    )
}

const LasModif = (props)=>{
    return(
        <>
        <div className="patients__examen align-self-end">
             <h6 className="lastExam__txt text-center">Les prochains Rendez-vous</h6>
             <div className="search__exam d-flex justify-content-between align-items-center m-1">
                <input className="pers__recherche" type="text" placeholder="Rechercher" />
                <span ><SearchIcon id="search__icon"/></span>
             </div>
             <div className="pers__examen">
                 <ProchainRdv avatar={avatar} name='Aek Boussaid' title='Etudiant' time='2m'/>
                 <ProchainRdv avatar={avatar} name='Moncif Bendada' title='Enseignant' time='1h'/>
                 <ProchainRdv avatar={avatar} name='Aek Boussaid' title='ATS' time='2h'/>
                 <ProchainRdv avatar={avatar} name='Mhammed Seddaoui' title='Etudiant' time='3h'/>
                 <ProchainRdv avatar={avatar} name='Moncif Bendada' title='Enseignant' time='1h'/>
                 <ProchainRdv avatar={avatar} name='Aek Boussaid' title='ATS' time='2h'/>
                 <ProchainRdv avatar={avatar} name='Mhammed Seddaoui' title='Etudiant' time='3h'/>
             </div>
         </div> 
     </>
    )
}
const Items = (props)=> {
    return(
        <div className="statics_types d-flex flex-column">
            <span>{props.type}</span>
            <span>{props.value}</span>
            <img src={props.src}/>
        </div>
    );
}
const LastEdit =(props) =>{
    return(
        <div className="modif_list">
            <h6 className="modif_item">{props.NO}</h6>
            <h6 className="modif_item">{props.patient}</h6>
            <h6 className="modif_item medecin__elem">{props.doctor}</h6>
            <h6 className="modif_item">{props.date}</h6>
        </div>
    )
}
const DashBoard = () => {

    const { loading, error, data } = useQuery(GET_PATIENTS_LIST);
    if (loading) return <Loading />;
    if (error) return <p>Error(:</p>;
    
    const { currentUser, patientsNumberByRole: { nodes: patientsNumber }, recentUpdatedDossierMedicals } = data

    return (
        <>
            <div className="main_ d-flex">
                <SideBar />
                <div className="dash_main">
                    <DoctorHeader  nom={currentUser.nom} prenom={currentUser.prenom} profilePictureUrl={currentUser.profilePicture} />

                    <div className="dash_statics d-flex flex-column">
                        <h1>Statiques Rapides</h1>
                        <div className="statics_content d-flex">
                            <div className="statics_nums d-flex flex-column">
                                <div className="statics_var ">
                                    <Items type="Nombres de visites médicales" value="255"/>
                                    <Items type="Maladies chroniques" value="120"/>
                                    <Items type="Nombres de visites ce mois" value="89"/>
                                </div>
                                <div className="last_modif">
                                     <div className="modif__rec"> 
                                            <h3 className="modif__txt mb-3 ml-2">DERNIERE MODIFICATION</h3>
                                            <div className="modif__rec__content container">
                                                <div className="titles row ">
                                                    <h6 className="modif_content col">№</h6>
                                                    <h6 className="modif_content col">NOM</h6>
                                                    <h6 className="modif_content col">MEDECIN</h6>
                                                    <h6 className="modif_content col-md-auto">DATE DE MODIFICATION </h6>
                                                </div>
                                                <LastEdit NO="1" patient="Mesmoudi Amine" doctor="Dr.johnny sins" date="14 September 2021"/>
                                                <LastEdit NO="1" patient="Mesmoudi Amine" doctor="Dr.johnny sins" date="14 September 2021"/>
                                                <LastEdit NO="1" patient="Mesmoudi Amine" doctor="Dr.johnny sins" date="14 September 2021"/>
                                                <LastEdit NO="1" patient="Mesmoudi Amine" doctor="Dr.johnny sins" date="14 September 2021"/>
                                                <LastEdit NO="1" patient="Mesmoudi Amine" doctor="Dr.johnny sins" date="14 September 2021"/>
                                                <LastEdit NO="1" patient="Mesmoudi Amine" doctor="Dr.johnny sins" date="14 September 2021"/>
                                                <LastEdit NO="1" patient="Mesmoudi Amine" doctor="Dr.johnny sins" date="14 September 2021"/>
                                                <LastEdit NO="1" patient="Mesmoudi Amine" doctor="Dr.johnny sins" date="14 September 2021"/>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="conatiner_lastmodif">
                            <LasModif/>
                            </div>
                          
                        </div>

                    </div>
                </div>
            </div>

            
        </>
    );
}

export default DashBoard;
