import React, {  useEffect,useState } from 'react';
import '../../assets/css/layout.css'
import { useKeycloak } from '@react-keycloak/web'
import avatar from '../../assets/images/avatar.jpg'
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HotelIcon from '@material-ui/icons/Hotel';
import DateRangeIcon from '@material-ui/icons/DateRange';
import BarChartIcon from '@material-ui/icons/BarChart';
import LanguageIcon from '@material-ui/icons/Language';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import SettingsIcon from '@material-ui/icons/Settings';
import logout from '../../assets/images/logout.svg'
import { NavLink } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { useSelector,useDispatch } from 'react-redux'; 
import {showSidebarAction,hideSidebarAction} from '../../redux/actions'
import esiDoctor from '../../assets/images/esiDoctor.svg'

let SideBar = () => {

   const {keycloak} = useKeycloak()




const getCurrentLink =() =>{

    const subDirectories=["dashboard","rdvList","patientsList","calendrier","stat","listes","param", "contact"]
    for (let i = 0; i < subDirectories.length; i++) {
      const elm = subDirectories[i];
      const currentLink = window.location.href
      const subPath = currentLink.search(elm)
       if(subPath>0){
         document.getElementById(elm).classList.add('selected__item')
        }
 
    }
}

useEffect(() => {
    getCurrentLink();
  });


    const dispatch = useDispatch(); 
    const showSidebar = useSelector(showSide => showSide.showSidebar)
 
   
    return (
        <>

        <div className={showSidebar +" "+"sideBar__container d-sm-block"}>
            <div className="d-flex justify-content-between">
                <img className="esiDoctor" src={esiDoctor} alt="esiDoctor" />
                <button onClick={()=> dispatch(hideSidebarAction())} className="closeSide__btn d-block d-sm-none"><FontAwesomeIcon icon={faTimes} /></button>
            </div>
        <div className="menu">
            <ul>
            <NavLink className="menu__links" onClick={()=> dispatch(hideSidebarAction())} to="/dashboard"><li id="dashboard" className="menu__items"><DashboardIcon className="dash__icons"/><span className="d-block d-sm-none d-md-block">Dashboard</span></li></NavLink>
                <NavLink className="menu__links" onClick={()=> dispatch(hideSidebarAction())} to="/patientsList"><li id="patientsList"  className="menu__items"><HotelIcon className="dash__icons"/><span className="d-block d-sm-none d-md-block">Patients</span></li></NavLink>
                <NavLink className="menu__links" onClick={()=> dispatch(hideSidebarAction())} to="/calendrier"><li id="calendrier" className="menu__items"><DateRangeIcon className="dash__icons"/><span className="d-block d-sm-none d-md-block">Calendrier</span></li></NavLink>
                <NavLink className="menu__links" onClick={()=> dispatch(hideSidebarAction())} to="/stat"><li id="stat" className="menu__items"><BarChartIcon className="dash__icons"/><span className="d-block d-sm-none d-md-block">Statistiques</span></li></NavLink>
            </ul>
        </div>
        <div className="other__menu">
            
            <p className="dash__titles d-none d-md-block" id="support">SUPPORT</p>
            <ul className="d-flex flex-column justify-content-between">
            <NavLink className="menu__links" onClick={()=> dispatch(hideSidebarAction())} to="contact"><li id="contact" className="menu__items"><LanguageIcon className="dash__icons"/><span className="d-block d-sm-none d-md-block">Contactez-nous</span></li></NavLink>
                <li className="menu__items logout__item "><button className="logout__btn d-flex align-items-center" onClick={() => keycloak.logout()}><FontAwesomeIcon id="logout_icon" icon={faSignOutAlt}/><span className="d-block d-sm-none d-md-block">Log Out</span></button></li>
            </ul>
        </div>
        </div>
        
        </>
    );
}

export default SideBar;
