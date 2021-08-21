import React from 'react';

const LastEdit = (props) => {
    return (
        <>
        <div className="modif__list row">
            <h6 className="modif__elem col-1">{props.NO}</h6>
            <h6 className="modif__elem col-3">{props.patient}</h6>
            <h6 className="modif__elem col-2 medecin__elem">{props.doctor}</h6>
            <h6 className="modif__elem col-3">{props.date}</h6>
            <h6 className="modif__elem col-2">{props.part}</h6>
            <h6 className="modif__elem col-1">{props.dossierNbr}</h6>
        </div>
        </>
    );
}

export default LastEdit;
