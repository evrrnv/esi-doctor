import React from 'react';
import SideBar from '../components/layout/sideBar';
import '../assets/css/patients.css'
import student from '../assets/images/student.svg'
import teacher from '../assets/images/teacher.svg'
import ats from '../assets/images/ATS.svg'
import PatientType from '../components/shared/patientType';
import LastEdit from '../components/shared/lastEdit';
import HistoLastExam from '../components/shared/histoLastExam'; 
import DoctorHeader from '../components/shared/doctorHeader';
import { useQuery } from '@apollo/client';
import { GET_PATIENTS_LIST } from '../graphql/queries/GET_PATIENTS_LIST';
import Loading from '../components/shared/loading';
import { convertDateToReadable } from '../utils';

const Patients = () => {

    const { loading, error, data } = useQuery(GET_PATIENTS_LIST);

    if (loading) return <Loading />;
    if (error) return <p>Error(:</p>;
    
    const { currentUser, patientsNumberByRole: { nodes: patientsNumber }, recentUpdatedDossierMedicals } = data

    return (
        <div className="main">
            <SideBar  />
            <div className="patients__content">
                <DoctorHeader  nom={currentUser.nom} prenom={currentUser.prenom} profilePictureUrl={currentUser.profilePicture} />
                <div className="patients__body d-block d-sm-flex justify-content-between">
                    <div className="patients__types align-self-end">
                        <h1 className="patients__header mb-3 text-center">Surveiller la santé  de vos Patients </h1>
                        <div className="types__div d-block d-md-flex justify-content-between">
                            <PatientType path="/patientsList/student" img={student} type='Etudiant' nbr={patientsNumber[0].count} />
                            <PatientType path="/patientsList/teacher" img={teacher} type='Enseignant' nbr={patientsNumber[1].count} />
                            <PatientType path="/patientsList/ats" img={ats} type='ATS' nbr={patientsNumber[2].count} />
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
                            { recentUpdatedDossierMedicals.nodes.map(v => {
                                const date = convertDateToReadable(new Date(v.date))
                                return (<LastEdit key={v.numero} NO={v.numero} patient={`${v.patientNom} ${v.patientPrenom}`} doctor={`Dr.${v.medecinNom}`} date={date}  part={v.partie} dossierNbr={v.numeroDossierMedical}/>)
                            }) }
                        </div>
                </div>
            </div>
        
        </div>
    );
};

export default Patients;