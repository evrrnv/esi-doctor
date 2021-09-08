import React, { useState } from 'react'

const InfoInput = React.forwardRef((props, ref) => {

    return(
        <div className="input__item d-flex align-items-flex-start">
            <span>{props.text}</span>
            <input 
            type="text" 
            className="form-control" 
            name={props.name} 
            defaultValue={props.value}
            ref={ref}
            />
        </div>
    );

})

export default InfoInput;