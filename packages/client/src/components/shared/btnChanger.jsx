import React from 'react'
import Confirmer from '../../assets/images/check.png'
import Annuler from '../../assets/images/undo-alt.png'
const BtnChangers = (props) => {
    return(
        <div className="_buttons d-flex justify-content-between">
            <button type="button" class="btn-cancel" onClick={props.onClickAnnuler}><img src={Annuler}/><span>Annuler</span></button>
            <button type="button" class="btn-confirme" onClick={props.onClickConfirmer}><img src={Confirmer}/><span>Confirmer</span></button>
        </div>
    );
}

export default BtnChangers;