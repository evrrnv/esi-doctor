import React,{useState} from 'react';
import '../../assets/css/patients.css'
import avatar  from '../../assets/images/avatar.jpg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '@material-ui/core';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import RdvDemand from './rdvDemand';
import { AprouvRdvAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';



const DoctorHeader = ({ nom, prenom, profilePictureUrl }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const dispatch = useDispatch();
    return (
        <div className="patients__head  d-flex justify-content-between align-items-center">
            <button className="d-block d-sm-none burger"><FontAwesomeIcon icon={faBars}/></button>
            <h2 className="head__txt d-none d-sm-block">Bonjour,<br></br> Dr.{nom} </h2>
            <div className="d-flex align-items-center">
                 <Avatar alt="profile picture" src={profilePictureUrl} style={{marginRight: "16px"}} />
                 <span className="avatar__infos">
                   <span className="avatar__name">M.{prenom} {nom}</span><br></br>
                   <span className="avatar__title"><ArrowForwardIosIcon className="arrow__title"/>Médecin</span>
                 </span>
                 <Dropdown className="notif__drop" isOpen={dropdownOpen} toggle={toggle}>
                   <DropdownToggle tag="span">
                      <span><NotificationsNoneIcon id="notif__icon" /></span>
                   </DropdownToggle>
                   <DropdownMenu right className="mt-3">
                     <h5 className="ml-2 text-center">NOTIFICATIONS</h5>
                     <DropdownItem divider />
                     <DropdownItem className="notifs d-flex justify-content-between align-items-center pt-3">
                        <h6 className="notif__txt text-wrap">Nombre de visites cette semaine a dépacé la moyenne</h6>
                        <h6 className="notif__flag">33 visites</h6>
                     </DropdownItem>
                     <DropdownItem divider />
                     <DropdownItem className="notifs d-flex justify-content-between align-items-center pt-3">
                        <h6 className="notif__txt">Vous avez complété<span className="notif__dossierNbr"> 9 dossiers</span> cette semaine</h6>
                     </DropdownItem>
                     <DropdownItem divider />
                     <h6 className="demand__rdv__txt ml-3 my-1">Demandes de rendez-vous</h6>
                     <DropdownItem className="notifs" onClick={() => dispatch(AprouvRdvAction())}>
                        <RdvDemand />
                     </DropdownItem>
                     <DropdownItem className="notifs " onClick={() => dispatch(AprouvRdvAction())}>
                        <RdvDemand />
                     </DropdownItem>
                     <DropdownItem className="notifs" onClick={() => dispatch(AprouvRdvAction())}>
                        <RdvDemand />
                     </DropdownItem>
                     <DropdownItem className="notifs" onClick={() => dispatch(AprouvRdvAction())}>
                        <RdvDemand />
                     </DropdownItem>
                     
                   </DropdownMenu>
                 </Dropdown>
                
            </div>
        </div>
    );
}

export default DoctorHeader;
