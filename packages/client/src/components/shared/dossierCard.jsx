import React, { useState } from 'react';
import '../../assets/css/specifPatients.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faEdit,  faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_EXAMEN_MEDICAL } from '../../graphql/mutations/CREATE_EXAMEN_MEDICAL';
import Loading from './loading';
import { useSelector,useDispatch } from 'react-redux';
import { archiveAction } from '../../redux/actions';

const DossierCard = ({ id, dossierMedicalId, nom, prenom, profilePictureUrl }) => {
    const dispatch = useDispatch(); 
    const toggleArchive = useSelector(archive => archive.toggleArchive) 
    const history = useHistory()

    const [loading, setLoading] = useState(false)

    const [createExamenMedical] = useMutation(CREATE_EXAMEN_MEDICAL, {
        onCompleted: (data) => {
            history.push({
                pathname: "/examiner",
                search: `?id=${id}+${data.createExamenMedical.examenMedical.id}`
            })
        }
    })

    const modifieRouteChange = () =>{ 
        setLoading(true)
        history.push({
            pathname: "/patientsListInfos",
            search: `?id=${id}`
        })
    }

    const examinerRouteChange = () =>{ 
        createExamenMedical({
            variables: {
                dossierMedicalId
            }
        })
    }

    return (
            <div className="dossier__card d-flex justify-content-between">
                <div className="dossier__infos d-flex align-items-center">
                    <Avatar alt="profile picture" src={profilePictureUrl} style={{marginRight: "16px"}} />
                    <div>
                        <h5>{prenom} {nom}</h5>
                        <h6 className="dossier__title">Etudiant</h6>
                    </div>
                </div>
                <div className="dossier__actions d-flex align-items-center">
                    <button className="dossier__btns dossier__exam" onClick={examinerRouteChange}>Examiner<FontAwesomeIcon className="dossierCard__icons" icon={faStethoscope}/></button>
                    <button className="dossier__btns dossier__edit" onClick={modifieRouteChange}>Modifier<FontAwesomeIcon className="dossierCard__icons" icon={faEdit}/></button>
                    <button className="dossier__btns dossier__archive" onClick={() => dispatch(archiveAction({nom,prenom}))}>Archiver<FontAwesomeIcon className="dossierCard__icons" icon={faArchive}/></button>
                </div>
            </div>
    );
}

export default DossierCard;
