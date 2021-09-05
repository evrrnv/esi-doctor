import React from 'react'

const Question = (props) => {
    return(
            <div className="question_input d-flex align-items-flex-start">
                <span>{props.question}</span>
                <select className="form-control">
                    <option>OUI</option>
                    <option>NON</option>
                </select>
            </div>
    );
}
export default Question;