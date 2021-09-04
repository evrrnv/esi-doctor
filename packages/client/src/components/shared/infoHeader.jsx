import React from 'react'
const InfoHeader = (props)=>{
    return(
        <div className="head_infos d-flex justify-content-between align-items-center">
            <div className="main_head_infos d-flex justify-content-between align-items-center ">
                <img alt="personal_icons" src={props.icon}/>
                <h1>{props.text}</h1>
            </div>
        </div>
    );
}

export default InfoHeader;