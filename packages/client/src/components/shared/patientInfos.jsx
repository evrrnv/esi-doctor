import React from 'react'
import '../../assets/css/shared.css'
import {useLocation,useHistory} from 'react-router-dom'
import SideBar from '../layout/sideBar'
import personalIcons from '../../assets/images/open-person.png'
import Biometric from '../../assets/images/fingerprint.png'
import Layer from '../../assets/images/Layer.png'
import Layer2 from '../../assets/images/Layer2.png'
import group from '../../assets/images/group.png'
import ModifierButton from './button' 
import InfosTab from './infosTab'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const PatientInfos = (props)=>{
    const location = useLocation();
    const history = useHistory()
    return(
        <div className="main_">
            <SideBar/>
            <button onClick={()=>history.goBack()} className="drop_down d-flex  burger"><ArrowBackIosIcon fontSize="large"/></button>
            <div className="patient_infos d-flex justify-content-between align-items-flex-end">
                <div className="general_infos d-flex justify-content-between align-items-center">
                    <div className="main__infos d-flex justify-content-between align-items-center">
                        <div className="personal_img">
                            <img alt="probably avatar of person" src={location.state.props.avatar}/>
                        </div>
                        <div className="informations">
                            <span className="titre">{location.state.props.title}</span>
                            <span className="nomEtprenom">{location.state.props.name}</span>
                            <span className="email">email@esi-sba.dz</span>
                        </div>
                    </div>
                    <div className="numbers d-flex justify-content-between align-items-flex-end">
                        <h1 className="visits_num">00</h1>
                        <span>Nombre totale de visites</span>
                    </div>
                </div>
                <div className="personal_infos">
                    <div className="head_infos d-flex justify-content-between align-items-center">
                        <div className="main_head_infos d-flex justify-content-between align-items-center ">
                            <img alt="personal_icons" src={personalIcons}/>
                            <h1>Informations Personnelles</h1>
                        </div>
                        <ModifierButton/>
                    </div>
                    <div className="all_infos">
                        <div className="list_item">
                            <div className="item">
                                <span>Nom</span>
                                <span>Prénom</span>
                                <span>Addresse</span>
                                <span>Télephone</span>
                            </div>
                            <div className="item">
                                <span>Mesmoudi</span>
                                <span>Amine</span>
                                <span>104 el amir,Tlemcen</span>
                                <span>077516235586</span>
                            </div>              
                        </div>
                        <div className="list_item">
                            <div className="item">
                                <span>Date de Naissance</span>
                                <span>Sexe</span>
                                <span>Situation Familiale</span>
                                <span>Niveau</span>
                            </div>
                            <div className="item">
                                <span>Nov 09,2000</span>
                                <span>Màle</span>
                                <span>Célilataire</span>
                                <span>2SC-SIW</span>
                            </div>
                        </div>
                        <div className="list_item">
                            <div className="item">
                                <span>Age</span>
                            </div>
                            <div className="item">
                                <span>20</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="infoTabs_items">
                    <InfosTab text="Biométriques" src={Biometric}/>
                    <InfosTab text="Antécédents Personnells" src={Layer2}/>
                    <InfosTab text="Antécédents Médico-Chirugicaux" src={Layer}/>
                    <InfosTab text="Examens Médicaux" src={group}/>
                </div>
            </div>
        </div>
    );
}
export default PatientInfos;