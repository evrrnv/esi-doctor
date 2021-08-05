import React from 'react';
import '../../assets/css/shared.css'

const PatientCard = (props) => {
    return (
        <div className="d-flex patient__card justify-content-between align-items-center">
            <div className="main__infos d-flex align-items-center">
                <img className="dm__avatar" src={props.avatar} alt="avatar" />
                <div className="infos">
                    <span className="card__name">{props.name}</span><br></br>
                    <span className="card__email">{props.email}</span>
                </div>
            </div>
            <div className="time">
                <span className="card__email">{props.time}</span>
            </div>
        </div>
    );
}

export default PatientCard;
