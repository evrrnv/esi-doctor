import React from 'react';
import avatar  from '../../assets/images/avatar.jpg';
import '../../assets/css/specifPatients.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faEdit,  faStethoscope } from '@fortawesome/free-solid-svg-icons';

const DossierCard = () => {
    return (
  
            <div className="dossier__card d-flex justify-content-between">
                <div className="dossier__infos d-flex align-items-center">
                    <img className="dossier__img" src={avatar}/>
                    <div>
                        <h5>Mmed Amin Mesmoudi</h5>
                        <h6 className="dossier__title">Etudiant</h6>
                    </div>
                </div>
                <div className="dossier__actions d-flex align-items-center">
                    <button className="dossier__btns dossier__exam">Examiner<FontAwesomeIcon className="dossierCard__icons" icon={faStethoscope}/></button>
                    <button className="dossier__btns dossier__edit">Modifier<FontAwesomeIcon className="dossierCard__icons" icon={faEdit}/></button>
                    <button className="dossier__btns dossier__archive">Archiver<FontAwesomeIcon className="dossierCard__icons" icon={faArchive}/></button>
                </div>
            </div>
        
    );
}

export default DossierCard;
