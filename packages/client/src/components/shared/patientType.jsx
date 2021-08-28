import React from 'react';
import '../../assets/css/patients.css'
import { NavLink } from 'react-router-dom';

const PatientType = (props) => {
    return (
        <>
        <NavLink className="typesLink"  to={props.path} style={{ textDecoration: 'none' }}>
            <div className="types d-flex felx-row flex-md-column justify-content-md-between align-items-center">
                <img className="types__imgs"  src={props.img} alt={props.type} />
                <div className="types__txt">
                   <h3 className="types__title mb-3 mb-md-2">{props.type}</h3>
                   <p className="nbr__tot">Nombre total : {props.nbr}</p>
                </div>
            </div>
        </NavLink>
        </>
        
    );
}

export default PatientType;
