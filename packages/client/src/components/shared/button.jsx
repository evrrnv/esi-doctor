import React from 'react'
import CreateIcon from '../../assets/images/awesome-edit.png'

const ModifierButton = (props)=>{
    return(
        <button className="modifier_button" onClick={props.onClick}>
            <img src={CreateIcon}/>
            <span>Modifier</span>
        </button>   
    );
}
export default ModifierButton;