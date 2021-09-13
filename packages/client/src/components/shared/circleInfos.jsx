import React from 'react';

const CircleInfos = (props) => {
    return (
        <>
           <div className="circle__infos d-flex mr-5 mb-3">
                <span className="color__circle" style={{backgroundColor: props.color, left: props.left}}></span>
                <span className="circle__infos__txt">{props.type}</span>
                <span className="circle__infos__txt ml-4">{props.percent}</span>
            </div> 
        </>
    );
}

export default CircleInfos;
