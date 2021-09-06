import React, {useEffect, useState} from 'react';
import SideBar from '../components/layout/sideBar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DoctorHeader from '../components/shared/doctorHeader';
import '../assets/css/specifPatients.css'
import HistoLastExam from '../components/shared/histoLastExam';
import TypeHero from '../components/shared/typeHero';
import DossierCard from '../components/shared/dossierCard';
import { useLazyQuery, useQuery, useApolloClient } from '@apollo/client';
import Loading from '../components/shared/loading';
import { GET_SPECIFIC_PATIENTS } from '../graphql/queries/GET_SPECIFIC_PATIENTS';
import { SEARCH_PATIENTS } from '../graphql/queries/SEARCH_PATIENTS';

const SpecifPatients = (props) => {

    const client = useApolloClient();

    const getRoleFromType = () => {
        if (props.type === 'Enseignants') return 'ENSEIGNANT'
        else if (props.type === 'ATS') return 'ATS'
        else return 'ETUDIANT'
    }

    const [searchValue, setSearchValue] = useState("")
    
    const { loading, error, data } = useQuery(GET_SPECIFIC_PATIENTS, {
        variables: {
            role: getRoleFromType()
        },
    });

    const [searchPatients] = useLazyQuery(SEARCH_PATIENTS, {
        onCompleted: ({ allUserAccounts }) => {
            let oldData = client.readQuery({
                query: GET_SPECIFIC_PATIENTS,
                variables: {
                    role: getRoleFromType()
                }
            })
            let newData = {...oldData}
            newData.allUserAccounts = allUserAccounts
            client.writeQuery({
                query: GET_SPECIFIC_PATIENTS,
                data: newData,
                variables: {
                    role: getRoleFromType()
                }
            })
        }
    });

    if (loading) return <Loading />
    if (error) return <p>Error :(</p>;
        
    const { currentUser, completedDossierMedicalsCounter, allUserAccounts } = data

    const completedNb = completedDossierMedicalsCounter.completed;
    const notCompletedNb = completedDossierMedicalsCounter.notCompleted;
    const total = completedNb + notCompletedNb;

    const searchChangeHandler = (e) => {
        setSearchValue(e.target.value)
    }

    const searchHandler = () => {
        searchPatients({
            variables: {
                role: getRoleFromType(),
                search: searchValue
            }
        })
    }

    return (
        <div className="specifPatients__main">
            <SideBar />
            <div className="patients__content">
                <DoctorHeader  nom={currentUser.nom} prenom={currentUser.prenom} />
                <div className="patients__body  d-block d-sm-flex justify-content-between">
                    <div className="patients__types align-self-end">
                    <h1 className="patients__header mb-3 text-center">Surveiller la santé  de vos Patients </h1>
                       <TypeHero type={props.type} nbr={total} complet={completedNb} nonComplet={notCompletedNb} img1={props.img1} img2={props.img2} /> 
                       <div className="Dm__search__container">
                           <input name="search patient" className="Dm__search" type="text" placeholder="Rechercher un dossier" value={searchValue} onChange={searchChangeHandler} />
                           <FontAwesomeIcon style={{cursor: "pointer"}} icon={faSearch} className="Dm__searchIcon" onClick={searchHandler} />
                        </div>
                    </div>
                    <HistoLastExam type={props.type} />
                </div>
    
                <div className="Dm__container">
                    <div className="Dm__content">
                        <h3 className="modif__txt Dm__txt mb-3 ">DOSSIERS MÉDICAUX</h3>
                        <div className="Dms ml-1  d-flex flex-column ">
                            { allUserAccounts.nodes.map(v => {
                                return (<DossierCard key={v.id} id={v.id} nom={v.nom} prenom={v.prenom} />)
                            }) }
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecifPatients;
