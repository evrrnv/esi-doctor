import React from 'react'
const InfoHeader = (props)=>{
    return(
        <div className="head_infos d-flex justify-content-between align-items-center">
            <div className="main_head_infos d-flex justify-content-between align-items-center ">
                <div className="img">
                 <img alt="personal_icons" src={props.icon}/>
                </div>
                <h1>{props.text}</h1>
            </div>
        </div>
    );
}

export default InfoHeader;