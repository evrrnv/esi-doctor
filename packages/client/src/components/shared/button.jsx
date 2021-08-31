import React from 'react'
import CreateIcon from '../../assets/images/awesome-edit.png'

const ModifierButton = ()=>{
    return(
        <button className="modifier_button">
            <img src={CreateIcon}/>
            <span>Modifier</span>
        </button>   
    );
}
export default ModifierButton;