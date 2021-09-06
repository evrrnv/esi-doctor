import React, { useState } from 'react'

const InfoInput = (props) => {

    return(
        <div className="input__item d-flex align-items-flex-start">
            <span>{props.text}</span>
            <input 
            type="text" 
            className="form-control" 
            name={props.name} 
            placeholder={props.value}
            />
        </div>
    );

}

export default InfoInput;