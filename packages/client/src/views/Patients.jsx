import React from 'react';
import SideBar from '../components/layout/sideBar';
import '../assets/css/patients.css'
import PatientCard from '../components/shared/patientCard';
import avatar  from '../assets/images/avatar.jpg';

const Patients = () => {
    return (
        <div className="main">
            <SideBar className="sideBar" />
            <div className="patients__content">
                <div className="patients__head d-flex justify-content-between">
                    <h2 className="head__txt">Surveiller la santé de votre Patients </h2>
                    <h2 className="head__tot">Totale <span id="tot__nbr">666</span></h2>
                </div>
                <div className="patients__types d-flex justify-content-around">
                    <div id="student" className="types">
                        <h3 className="type__txt">Etudiants</h3>
                    </div>
                    <div id="teacher" className="types">
                        <h3 className="type__txt">Enseignants</h3>
                    </div>
                    <div id="ats" className="types">
                        <h3 className="type__txt">ATS</h3>
                    </div>
                </div>
                <div className="modif__rec">
                    <h2 className="modif__txt">Dossiers modifies récemment </h2>
                    <div className="dm__rec container">
                        <PatientCard avatar={avatar} name="M.Amin Mesmoudi" email="m.mesmoudi@esi-sba.dz" time="2 heures" />
                        <PatientCard avatar={avatar} name="M.Amin Mesmoudi" email="m.mesmoudi@esi-sba.dz" time="2 heures" />
                        <PatientCard avatar={avatar} name="M.Amin Mesmoudi" email="m.mesmoudi@esi-sba.dz" time="2 heures" />
                        <PatientCard avatar={avatar} name="M.Amin Mesmoudi" email="m.mesmoudi@esi-sba.dz" time="2 heures" />
                        <PatientCard avatar={avatar} name="M.Amin Mesmoudi" email="m.mesmoudi@esi-sba.dz" time="2 heures" />
                        <PatientCard avatar={avatar} name="M.Amin Mesmoudi" email="m.mesmoudi@esi-sba.dz" time="2 heures" />
                        <PatientCard avatar={avatar} name="M.Amin Mesmoudi" email="m.mesmoudi@esi-sba.dz" time="2 heures" />
                        
                    </div>
                </div>
            </div>
        
        </div>
    );
};

export default Patients;