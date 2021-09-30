import React from 'react';
import avatar  from '../../assets/images/avatar.jpg';


const RdvDemand = ({ nom, prenom, profilePicture, role, startDate }) => {

    const duration = new Date(startDate).getTime() - new Date().getTime()

    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    let rest
    if (hours > 0) {
        rest = hours + "h"
    } else if (minutes > 0) {
        rest = minutes + "m"
    } else if (seconds > 0) {
        rest = seconds + "s"
    } else {
        rest = "0s"
    }

    return (
        <>
            <div className="demand__rdv d-flex justify-content-between align-items-center">
                 <div className="d-flex align-items-center">
                   <img src={profilePicture} className="demand__img mr-2" alt="avatar" />
                   <div className="d-flex flex-column justify-content-center">
                       <h5 className="demand__name">{`${nom} ${prenom}`}</h5>
                       <h6 className="demand__role">{role}</h6>
                   </div>
                 </div>
                 <h6 className="demand__time">{rest}</h6>                           
           </div>
        </>
    );
}

export default RdvDemand;
