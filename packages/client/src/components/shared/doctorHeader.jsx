import React,{useState} from 'react';
import '../../assets/css/patients.css'
import avatar  from '../../assets/images/avatar.jpg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '@material-ui/core';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



const DoctorHeader = ({ nom, prenom, profilePictureUrl }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
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
                 <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                   <DropdownToggle tag="span">
                      <span><NotificationsNoneIcon id="notif__icon" /></span>
                   </DropdownToggle>
                   <DropdownMenu right className="mt-3">
                     <DropdownItem>NOTIFICATIONS</DropdownItem>
                     <DropdownItem>
                        <div className="notif__item pers d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center"> 
                                <img className="dash__avatar__ex" src={avatar} alt="e" />
                                <span className="avatar__infos__ex">
                                  <span className="avatar__name__ex">Boousmat</span><br />
                                  <span className="avatar__title__ex">Etudiant</span>
                                </span>
                            </div>
                            <span id="lastExam__time">10:00</span>
                        </div>
                     </DropdownItem>
                     <DropdownItem>
                        <div className="notif__item pers d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center"> 
                                <img className="dash__avatar__ex" src={avatar} alt="e" />
                                <span className="avatar__infos__ex">
                                  <span className="avatar__name__ex">Boousmat</span><br />
                                  <span className="avatar__title__ex">Etudiant</span>
                                </span>
                            </div>
                            <span id="lastExam__time">10:00</span>
                        </div>
                     </DropdownItem>
                   </DropdownMenu>
                 </Dropdown>
                
            </div>
        </div>
    );
}

export default DoctorHeader;
