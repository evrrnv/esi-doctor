import React from 'react';
import '../../assets/css/patients.css'
import avatar  from '../../assets/images/avatar.jpg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { showSidebarAction } from '../../redux/actions';
import { useSelector,useDispatch } from 'react-redux'; 


const DoctorHeader = () => {


    const dispatch = useDispatch(); 
    const showSidebar = useSelector(showSide => showSide.showSidebar)


    return (
        <div className="patients__head  d-flex justify-content-between align-items-center">
            <button onClick={()=> dispatch(showSidebarAction())} className="d-block d-sm-none burger"><FontAwesomeIcon icon={faBars}/></button>
            <h2 className="head__txt d-none d-sm-block">Bonjour,<br></br> Dr.Mesmoudi </h2>
            <div className="d-flex align-items-center">
                 <img className="dash__avatar" src={avatar} alt="" />
                 <span className="avatar__infos">
                   <span className="avatar__name">M.Amin Mesmoudi</span><br></br>
                   <span className="avatar__title"><ArrowForwardIosIcon className="arrow__title"/>Médecin</span>
                 </span>
                 <span><NotificationsNoneIcon id="notif__icon" /></span>
            </div>
        </div>
    );
}

export default DoctorHeader;
