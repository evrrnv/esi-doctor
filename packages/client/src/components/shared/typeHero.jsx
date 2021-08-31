import React from 'react';


const TypeHero = (props) => {
    return (
        <div className="typeHero__main">
            <div className="d-flex justify-content-between">
                <div className="d-block">
                    <div className="d-flex  align-items-center">
                        <img src={props.img2} />
                        <h6 className="typeHero__nbr">Nombre total : {props.nbr}</h6>
                    </div>
                    <h1 className="typeHero__txt">{props.type}</h1>
                </div>
                <img className="typeHero__img" src={props.img1} alt="" />
            </div>
            <div className="typeHero__infos d-flex">
                <h6 className="typeHero__infos__txt" id="Dm__complet">Dossiers complets : {props.complet}</h6>
                <h6 className="typeHero__infos__txt" id="Dm__noncomplet">Dossiers non-complets : {props.nonComplet}</h6>
            </div>
        </div>
    );
}

export default TypeHero;
