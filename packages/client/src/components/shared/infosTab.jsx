import React from 'react'
import ModifierButton from '../shared/button' 

const InfosTab = (props)=>{
    return(
        <div className="details_infos d-flex justify-content-flex-start">
            <div className="empty_" style={props.isCompleted ? {backgroundColor: "#56C596"} : {backgroundColor: '#F63232'}}>
            </div>
            <div className="head_infos d-flex justify-content-between align-items-center">
                <div className="main__infos d-flex justify-content-between align-items-center">
                    <img alt="personal_icons" src={props.src}/>
                    <span className="detaills_text">{props.text}</span>
                </div>
                <ModifierButton onClick={props.onClick}/>
            </div>
        </div>
    );
}

export default InfosTab;