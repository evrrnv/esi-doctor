import React from 'react';
import '../../assets/css/patients.css'
import avatar  from '../../assets/images/avatar.jpg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '@material-ui/core';


const DoctorHeader = ({ nom, prenom, profilePictureUrl }) => {

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
                 <span><NotificationsNoneIcon id="notif__icon" /></span>
            </div>
        </div>
    );
}

export default DoctorHeader;
