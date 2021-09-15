import React from 'react';
import avatar  from '../../assets/images/avatar.jpg';


const RdvDemand = () => {
    return (
        <>
            <div className="demand__rdv d-flex justify-content-between align-items-center">
                 <div className="d-flex align-items-center">
                   <img src={avatar} className="demand__img mr-2" alt="avatar" />
                   <div className="d-flex flex-column justify-content-center">
                       <h5 className="demand__name">M.Amin Mesmoudi</h5>
                       <h6 className="demand__role">Etudiant</h6>
                   </div>
                 </div>
                 <h6 className="demand__time">2min</h6>                           
           </div>
        </>
    );
}

export default RdvDemand;
