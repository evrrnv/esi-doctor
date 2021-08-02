import React, {  useEffect } from 'react';
import '../../assets/css/layout.css'
import { useKeycloak } from '@react-keycloak/web'
import avatar from '../../assets/images/avatar.jpg'
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HotelIcon from '@material-ui/icons/Hotel';
import DateRangeIcon from '@material-ui/icons/DateRange';
import BarChartIcon from '@material-ui/icons/BarChart';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LanguageIcon from '@material-ui/icons/Language';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import SettingsIcon from '@material-ui/icons/Settings';
import logout from '../../assets/images/logout.svg'
import { NavLink } from 'react-router-dom';




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

    

  
    return (
        <>

        <div className="sideBar__container">
            <h1 className="dash__logo">LOGO</h1>
            <div className="d-flex align-items-center mt-3">
                <img className="dash__avatar" src={avatar} alt="" />
                <span className="avatar__infos">
                    <span className="avatar__name">M.Amin Mesmoudi</span><br></br>
                    <span className="avatar__title"><ArrowForwardIosIcon className="arrow__title"/>Médecin</span>
                </span>
            </div>

        <div className="menu">
            <ul>
            <NavLink className="menu__links" to="/dashboard"><li id="dashboard" className="menu__items"><DashboardIcon className="dash__icons"/>Dashboard</li></NavLink>
                <NavLink className="menu__links" to="/rdvList"><li id="rdvList" className="menu__items"><EventAvailableIcon className="dash__icons"/>Rendez-Vous</li></NavLink>
                <NavLink className="menu__links" to="/patientsList"><li id="patientsList"  className="menu__items"><HotelIcon className="dash__icons"/>Patients</li></NavLink>
                <NavLink className="menu__links" to="/calendrier"><li id="calendrier" className="menu__items"><DateRangeIcon className="dash__icons"/>Calendrier</li></NavLink>
                <NavLink className="menu__links" to="/stat"><li id="stat" className="menu__items"><BarChartIcon className="dash__icons"/>Statistiques</li></NavLink>
            </ul>
        </div>
        <div className="other__menu">
            <p className="dash__titles">MANAEMENT</p>
            <ul>
            <NavLink className="menu__links" to="listes"><li id="listes" className="menu__items"><WebAssetIcon className="dash__icons"/>Listes</li></NavLink>
            <NavLink className="menu__links" to="param"><li id="param" className="menu__items"><SettingsIcon className="dash__icons"/>Paramêtres</li></NavLink>
            </ul>
            <p className="dash__titles" id="support">SUPPORT</p>
            <ul className="d-flex flex-column justify-content-between">
            <NavLink className="menu__links" to="contact"><li id="contact" className="menu__items"><LanguageIcon className="dash__icons"/>Contactez-nous</li></NavLink>
                <li className="menu__items logout__item"><button className="logout__btn" onClick={() => keycloak.logout()}><img className="logout__icon" src={logout}/>Log Out</button></li>
            </ul>
        </div>
        </div>
        
        </>
    );
}

export default SideBar;
