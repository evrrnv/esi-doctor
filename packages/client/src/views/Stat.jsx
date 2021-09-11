import React , {useState} from 'react';
import SideBar from '../components/layout/sideBar';
import DoctorHeader from '../components/shared/doctorHeader';
import { useQuery } from '@apollo/client';
import { GET_PATIENTS_LIST } from '../graphql/queries/GET_PATIENTS_LIST';
import Loading from '../components/shared/loading';
import { convertDateToReadable } from '../utils';
import '../assets/css/stat.css'
import TimelineIcon from '@material-ui/icons/Timeline';
import StatCard from '../components/shared/statCard';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';
import 'react-google-flight-datepicker/dist/main.css';




const Stat = () => {
    
   
    const { loading, error, data } = useQuery(GET_PATIENTS_LIST);
    console.log('data:{'+data+'}')
    if (loading) return <Loading />;
    if (error) return <p>Error(:</p>;
    
    const { currentUser, patientsNumberByRole: { nodes: patientsNumber }, recentUpdatedDossierMedicals } = data


    

    return (
        <div className="main">
            <SideBar/>
            <div className="patients__content">
                <DoctorHeader  nom={currentUser.nom} prenom={currentUser.prenom} profilePictureUrl={currentUser.profilePicture} />
                <div className="stat__body mt-4">
                        <div className="stat__head d-flex justify-content-between">
                            <div className="stat__head__title d-flex">
                                <TimelineIcon id="timeline__icon" />
                                <h3 className="stat__head__txt">Statistiques totales</h3>
                            </div>
                            <div className="stat__filter d-flex">
                                <div className="stat__day__filter d-flex mr-2">
                                    <button className="stat__day__filter__btns">Aujourd'hui</button>
                                    <button className="stat__day__filter__btns">Semaine</button>
                                    <button className="stat__day__filter__btns">Mois</button>
                                    <button className="stat__day__filter__btns">Trimestre</button>
                                    <button className="stat__day__filter__btns last__filter__btn">Année</button>
                                </div>
                                <div className="stat__date__filter">
                      

                                </div>
                            </div>
                        </div>
                        <div className="stat__general mt-4 mb-3 mx-1 row">
                            <div className="stat__cards__container col-8">
                                <div className="stat__cards row">
                                    <div className="col-3">
                                        <StatCard icon={faSuitcase} nbr="460" type="Etudiant" percent="+50%"/>
                                    </div>
                                    <div className="col-3">
                                        <StatCard icon={faSuitcase} nbr="30" type="Enseignant" percent="+23%"/>
                                    </div>
                                    <div className="col-3">
                                        <StatCard icon={faSuitcase} nbr="15" type="ATS" percent="+34%"/>
                                    </div>
                                    <div className="col-3">
                                        <StatCard icon={faSuitcase} nbr="567" type="Total" percent="+45%"/>
                                    </div>
                                </div>
                                <div className="stat__cards mt-4 row">
                                    <div className="col-3">
                                        <StatCard icon={faSuitcase} nbr="356" type="Homme" percent="+34%"/>
                                    </div>
                                    <div className="col-3">
                                        <StatCard icon={faSuitcase} nbr="120" type="Femme" percent="+26%"/>
                                    </div>
                                    <div className="col-3">
                                        <StatCard icon={faSuitcase} nbr="346" type="Dossiers complets" percent="+18%"/>
                                    </div>
                                    <div className="col-3">
                                        <StatCard icon={faSuitcase} nbr="135" type="Dossiers non-complets" percent="+50%"/>
                                    </div>
                                </div>
                            </div>
                            <div className="stat__circle__container col-4">

                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Stat;