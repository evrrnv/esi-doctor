import React from 'react';

const LastExam = (props) => {
    return (
        <>
            <div className="pers d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center"> 
                    <img className="dash__avatar__ex" src={props.avatar} alt={props.name} />
                    <span className="avatar__infos__ex">
                      <span className="avatar__name__ex">{props.name}</span><br />
                      <span className="avatar__title__ex">{props.title}</span>
                    </span>
                </div>
                <span id="lastExam__time">{props.time}</span>
            </div>
        </>
    );
}

export default LastExam;
